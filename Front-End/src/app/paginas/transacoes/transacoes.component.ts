import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertaService } from 'src/app/service/alerta.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { MesService } from 'src/app/service/mes.service';
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

  idUSer = environment.id;
  TipoTransacao: string;

  idCategoria: number;
  idMes: number;
  mesConsulta: number;
  somaTransacao: number = 0;
  somaReceita: number = 0;

  // Order pipe
  key = 'data'
  reverse = true

  constructor(
    private userService: UserService,
    private categoriaService: CategoriaService,
    private transacaoService: TransacaoService,
    private mesService: MesService,
    private alerta: AlertaService,
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

    // Busca as transações feitas pelo usuário no mês atual
    for (let transacao of this.user.transacao) {
      if (transacao.mes.id == this.mesConsulta) {
        this.transacaoMesUser.push(transacao)
        if (transacao.tipo == "Despesa") {
          this.somaTransacao += transacao.valor
        } else if (transacao.tipo == "Receita") {
          this.somaReceita += transacao.valor
        }
      }
    }
  }

  getAllCategorias() {
    this.categoriaService.getAllCategorias().subscribe((resp: Categoria[]) => {
      this.listaCategorias = resp


    })
  }

  getByIdTransacao(id: string) {
    this.transacaoService.getById(Number(id)).subscribe((resp: Transacao) => {
      this.transacaoUtil = resp
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
    this.mes.id = this.idMes
    this.transacao.mes = this.mes

    // POST
    this.transacaoService.postTransacao(this.transacao).subscribe((resp: Transacao) => {
      this.transacao = resp

      this.alerta.showAlertSuccess('Transação adicionada com sucesso!')
      this.transacao = new Transacao()
      this.getByIdUser()
    },
    error => {
      if(error.status == 400){
        this.alerta.showAlertDanger(`HTTP: ${error.status} - Entre em contato com o administrador`)
      }
    })
  }

  editar() {
    this.transacaoUtil.tipo = this.TipoTransacao

    // Relacionamentos
    this.transacaoUtil.categoria = this.categoria
    this.transacaoUtil.mes = this.mes

    this.transacaoService.editTransacao(this.transacaoUtil).subscribe((resp: Transacao) => {
      this.transacaoUtil = resp
      this.alerta.showAlertInfo('Transação atualizada com sucesso!')

      // Zera e atualiza as variáveis
      this.transacaoUtil = new Transacao();
      this.getByIdUser()
    },
    error => {
      if(error.status == 400){
        this.alerta.showAlertDanger(`HTTP: ${error.status} - Entre em contato com o administrador`)
      }
    })
  }

  apagar() {
    this.transacaoService.deleteTransacao(this.transacaoUtil.id).subscribe(() => {
      this.alerta.showAlertSuccess('Transação deletada com sucesso!')

      // Zera e atualiza as variáveis
      this.transacaoUtil = new Transacao();
      this.getByIdUser()
    })
  }
}
