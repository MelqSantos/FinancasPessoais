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
    this.mesService.getAll().subscribe((resp: Mes[]) => {
      this.listaMeses = resp

      this.getTransacaoAno()
    })
  }

  getMesById() {
    this.mesService.getByIdMes(this.idMes).subscribe((resp: Mes) => {
      this.mesAtual = resp

      // Chama a função para verificar as transações do usuário
      this.getTransacaoUser()
    })
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
    for (let transacao of this.mesAtual.transacao) {

      if (transacao.usuario.id == this.idUser && transacao.tipo == "Despesa") {
        this.somaDespesa += transacao.valor
      } else if (transacao.usuario.id == this.idUser && transacao.tipo == "Receita") {
        this.somaReceita += transacao.valor
      }
    }
    this.balanco = this.somaReceita - this.somaDespesa

    // Faz o cálculo de controle financeiro
    const perc =  100 - ((100 * this.somaDespesa) / this.somaReceita)
    sessionStorage.setItem('percentual', perc.toString())
  }

  // Verifica as transações feitas pelo usuário no ano atual
  getTransacaoAno() {
    for (let mes of this.listaMeses) {

      if (mes.transacao.length != 0) {

        for (let transacao of mes.transacao) {
          if (transacao.usuario.id == this.idUser && transacao.tipo == "Despesa") {
            this.somaAnualDespesas += transacao.valor
          }

          if (transacao.usuario.id == this.idUser && transacao.categoria.descricao == "Investimento") {
            this.somaEconomia += transacao.valor
          }
        }
      }
    }
  }


}
