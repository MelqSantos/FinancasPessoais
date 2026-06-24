import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MesService } from 'src/app/service/mes.service';
import { environment } from 'src/environments/environment.prod';
import { Mes } from 'src/model/Mes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  mesAtual: Mes = new Mes();
  listaMeses: Mes[];

  idMes: number;
  idUser = environment.id
  somaDespesa: number = 0;
  somaAnualDespesas: number = 0;
  somaReceita: number = 0;
  somaEconomia: number = 0;
  balanco: number = 0;
  percentual: number = 0;
  loadingMes: boolean = false;
  loadingAno: boolean = false;
  

  constructor(
    private mesService: MesService,
    private router: Router
  ) { }

  ngOnInit() {

    if (environment.token == "") {
      this.router.navigate(['/login']);
    }

    this.getMesAtual()
    this.getMesById()
    this.getAllMeses()
  }

  getMesAtual() {
    let data = new Date();
    this.idMes = data.getMonth() + 1
  }

  getAllMeses() {
    this.loadingAno = true
    this.mesService.getAll().subscribe((resp: Mes[]) => {
      this.listaMeses = resp || []
      this.loadingAno = false

      this.getTransacaoAno()
    }, () => this.loadingAno = false)
  }

  getMesById() {
    this.loadingMes = true
    this.mesService.getByIdMes(this.idMes).subscribe((resp: Mes) => {
      this.mesAtual = resp
      this.loadingMes = false

      // Chama a função para verificar as transações do usuário
      this.getTransacaoUser()
    }, () => this.loadingMes = false)
  }

  getMesByIdTeste() {
    this.mesService.getByIdMes(this.idMes).subscribe((resp: Mes) => {
      this.mesAtual = resp

      // Chama a função para verificar as transações do usuário
      this.getTransacaoUser()
    })
  }

  // Verifica as transações feitas pelo usuário no mês atual
  getTransacaoUser() {
    // Reset antes de recalcular (evita acumulação em múltiplas chamadas)
    this.somaDespesa = 0
    this.somaReceita = 0
    this.percentual = 0

    if (!this.mesAtual || !this.mesAtual.transacao) {
      this.balanco = 0
      return
    }

    for (let transacao of this.mesAtual.transacao) {
      if (transacao.usuario && transacao.usuario.id == this.idUser) {
        if (transacao.tipo == "Despesa") { this.somaDespesa += transacao.valor || 0; }
        if (transacao.tipo == "Receita") { this.somaReceita += transacao.valor || 0; }
      }
    }
    this.balanco = this.somaReceita - this.somaDespesa;
    if (this.somaReceita > 0) {
      this.percentual = 100 - ((100 * this.somaDespesa) / this.somaReceita)
      if (this.percentual < 0) {
        this.percentual = 0
      }
    }
  }

  // Verifica as transações feitas pelo usuário no ano atual
  getTransacaoAno() {
    // Reset valores antes de calcular
    this.somaAnualDespesas = 0
    this.somaEconomia = 0

    if (!this.listaMeses) return

    for (let mes of this.listaMeses) {
      if (!mes.transacao || mes.transacao.length == 0) continue

      for (let transacao of mes.transacao) {
        if (!transacao.usuario || transacao.usuario.id != this.idUser) continue

        if (transacao.tipo == "Despesa") this.somaAnualDespesas += transacao.valor || 0
        if (transacao.categoria && transacao.categoria.descricao == "Investimento") this.somaEconomia += transacao.valor || 0
      }
    }
    
  }


}
