import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/service/categoria.service';
import { MesService } from 'src/app/service/mes.service';
import { NotificationService } from 'src/app/service/notification.service';
import { TransacaoService } from 'src/app/service/transacao.service';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from 'src/model/Categoria';
import { Mes } from 'src/model/Mes';
import { Transacao } from 'src/model/Transacao';
import { Usuario } from 'src/model/Usuario';

@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes.component.html',
  styleUrls: ['./transacoes.component.css']
})
export class TransacoesComponent implements OnInit {

  user: Usuario = new Usuario();
  transacao: Transacao = new Transacao();
  transacaoUtil: Transacao = new Transacao();
  categoria: Categoria = new Categoria();
  mes: Mes = new Mes();

  listaMeses: Mes[];
  listaCategorias: Categoria[];
  transacaoMesUser: Transacao[] = [];
  transacaoMesUser2: Transacao[];

  idUSer = environment.id;
  TipoTransacao: string;

  catDesc: string;
  mesDesc: string;

  idCategoria: number;
  idMes: number;
  mesConsulta: number;
  somaTransacao: number = 0;
  somaReceitaVr = 0;
  somaDespesaVr = 0;
  gastos: number = 0;
  somaReceita: number = 0;
  ganhos: number = 0;


  constructor(
    private userService: UserService,
    private categoriaService: CategoriaService,
    private transacaoService: TransacaoService,
    private mesService: MesService,
    private alerta: NotificationService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == "") {
      this.router.navigate(['/']);
    }

    // Busca a data atual
    var data: Date = new Date()
    this.mesConsulta = data.getMonth() + 1

    this.userService.refreshToken()
    this.getByIdUser()
    this.getAllCategorias()
    this.getAllMeses()

  }

  getAllMeses() {
    this.mesService.getAll().subscribe((resp: Mes[]) => {
      this.listaMeses = resp
    })
  }

  getByIdUser() {
    this.userService.getByIdUser(this.idUSer).subscribe((resp: Usuario) => {
      this.user = resp

      this.getTransacaoUser()
    })
  }

  getTransacaoUser() {
    // Zera as variáveis ao chamar novamente a função
    this.transacaoMesUser = []
    this.somaTransacao = 0
    this.somaReceita = 0
    this.somaReceitaVr = 0
    this.somaDespesaVr = 0

    // Busca as transações feitas pelo usuário no mês atual
    for (let transacao of this.user.transacao) {

      if (transacao.mes.id == this.mesConsulta) {
        this.transacaoMesUser.push(transacao)

        // Transações comuns
        if (transacao.tipo == "Despesa" && transacao.categoria.descricao != "Refeição") {
          this.somaTransacao += transacao.valor
        } else
          if (transacao.tipo == "Receita" && transacao.categoria.descricao != "Refeição") {
            this.somaReceita += transacao.valor
          }

        // Transações com Vale Refeição
        if (transacao.tipo == "Despesa" && transacao.categoria.descricao == "Refeição") {
          this.somaDespesaVr += transacao.valor
        } else
          if (transacao.tipo == "Receita" && transacao.categoria.descricao == "Refeição") {
            this.somaReceitaVr += transacao.valor
          }
      }
      // Faz o cálculo de controle financeiro
      let perc = 100 - ((100 * this.somaTransacao) / this.somaReceita)
      if (perc < 0) {
        perc = 0;
      }

      let valor = perc.toFixed(2) // Arredonda o valor para 2 casas decimais
      sessionStorage.setItem('percentual', valor.toString())
    }

    // Ordena as transações
    this.transacaoMesUser.sort((a, b) => (a.id < b.id) ? 1 : -1)
  }

  getAllCategorias() {
    this.categoriaService.getAllCategorias().subscribe((resp: Categoria[]) => {
      this.listaCategorias = resp
    })
  }

  getByIdTransacao(id: string) {
    this.transacaoService.getById(Number(id)).subscribe((resp: Transacao) => {
      this.transacaoUtil = resp

      this.catDesc = this.transacaoUtil.categoria.descricao
      this.mesDesc = this.transacaoUtil.mes.descricao
    })
  }

  getCategoriaById() {
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria) => {
      this.categoria = resp
    })
  }

  getMesById() {
    this.mesService.getByIdMes(this.idMes).subscribe((resp: Mes) => {
      this.mes = resp
    })
  }

  getMesByIdPerc() {
    let data = new Date()
    let mes = data.getMonth() + 1

    this.mesService.getByIdMes(mes).subscribe((resp: Mes) => {
      this.mes = resp

      this.mesDesc = this.mes.descricao
      // Chama a função para verificar as transações do usuário
      this.getTransacaoUser()
    })
  }

  // Verificação do tipo da transação escolhida
  tipoTr(event: any) {
    this.TipoTransacao = event.target.value
  }

  cadastrar() {
    this.getByIdUser()
    this.transacao.tipo = this.TipoTransacao

    // Relacionamento Transação x User
    this.user.id = this.idUSer
    this.transacao.usuario = this.user

    // Relacionamento Transação x Categoria
    this.categoria.id = this.idCategoria
    this.transacao.categoria = this.categoria

    // Relacionamento Transação x Mes
    this.mes.id = this.mesConsulta
    this.transacao.mes = this.mes

    // Validações dos campos
    let campo = this.transacao

    if (campo.descricao == undefined ||
      campo.valor == undefined ||
      campo.tipo == undefined ||
      campo.mes.id == undefined ||
      campo.categoria.id == undefined
    ) {
      this.alerta.showWarning('Favor verificar os campos vazios!', 'Atenção')
    }
    else {
      // POST dos dados
      this.transacaoService.postTransacao(this.transacao).subscribe((resp: Transacao) => {
        this.transacao = resp

        this.alerta.showSuccess('Transação adicionada!', 'Sucesso')
        this.transacao = new Transacao()
        this.getByIdUser()
      },
        error => {
          if (error.status == 400) {
            this.alerta.showError('Entre em contato com o administrador!', `Erro HTTP: ${error.status}`)
          }
        })
    }
  }

  editar() {
    this.transacaoUtil.tipo = this.TipoTransacao

    // Relacionamentos
    this.transacaoUtil.categoria = this.categoria
    this.transacaoUtil.mes.id = this.mesConsulta

    // Validações dos campos
    let campo = this.transacaoUtil

    if (campo.descricao == undefined ||
      campo.valor == undefined ||
      campo.tipo == undefined ||
      campo.mes.id == undefined ||
      campo.categoria.id == undefined) {
      this.alerta.showWarning('Favor verificar os campos vazios!', 'Atenção')
    }
    else {
      this.transacaoService.editTransacao(this.transacaoUtil).subscribe((resp: Transacao) => {
        this.transacaoUtil = resp
        this.alerta.showInfo('Transação atualizada!', 'Sucesso')

        // Zera e atualiza as variáveis
        this.transacaoUtil = new Transacao();
        this.getByIdUser()
      },
        error => {
          if (error.status == 400) {
            this.alerta.showError('Entre em contato com o administrador!', `HTTP: ${error.status}`)
          }
        })
    }
  }

  apagar() {
    this.transacaoService.deleteTransacao(this.transacaoUtil.id).subscribe(() => {
      this.alerta.showSuccess('Transação deletada!', 'Sucesso')

      // Zera e atualiza as variáveis
      this.transacaoUtil = new Transacao();
      this.getByIdUser()
    })
  }
}
