import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MesService } from 'src/app/service/mes.service';
import { TransacaoService } from 'src/app/service/transacao.service';
import { environment } from 'src/environments/environment.prod';
import { Mes } from 'src/model/Mes';
import { Transacao } from 'src/model/Transacao';
import { TransacaoUtil } from 'src/model/TransacaoUtil';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent implements OnInit {

  constructor(
    private mesService: MesService,
    private router: Router,
    private transacaoService: TransacaoService 
  ) { }

  listaMeses: Mes[];
  transacoesMes: Transacao[];
  totalTransacoes: TransacaoUtil;
  totalReceita: TransacaoUtil;
  totalDespesa: TransacaoUtil;

  userId = environment.id;
  mesDesc: string;
  mesConsulta: number;
  tipoConsulta: string = "0";

  ngOnInit() {
    if (environment.token == "") {
      this.router.navigate(['/']);
    }

     // Busca a data atual
     var data: Date = new Date()
     this.mesConsulta = data.getMonth() + 1
     
     this.getAllMeses();
     this.getTotalTransacoes(this.userId, this.mesConsulta, "Despesa");
     this.getTotalTransacoes(this.userId, this.mesConsulta, "Receita");
     this.getByMes(this.userId, this.mesConsulta);
  }

  getAllMeses() {
    this.mesService.getAll().subscribe((resp: Mes[]) => {
      this.listaMeses = resp
      this.mesDesc = this.listaMeses[this.mesConsulta -1].descricao;
    })
  }

  // Transações por mês
  getByMes(userId: number, mesId: number){
    this.transacaoService.getByMes(userId, mesId).subscribe((resp: Transacao[]) => {
      this.transacoesMes = resp
    })
  }

  getTotalTransacoesMes(userId: number, mesId: number){
    this.transacaoService.getTotalMes(userId, mesId).subscribe((resp: TransacaoUtil) => {
      this.totalTransacoes = resp;
    })
  }

  getTotalTransacoes(userId: number, mesId: number, tipo: string){
    this.transacaoService.getTotalTransacoes(userId, mesId, tipo).subscribe((resp: TransacaoUtil) => {
      if(tipo == "Receita"){
        this.totalReceita = resp
      } else{
        this.totalDespesa = resp
      }
    })
  }

  trTipo(event: any) {
    this.tipoConsulta = event.target.value
  }

  trMesId(event: any) {
    this.mesConsulta = event.target.value
    this.getAllMeses();
  }

  searchByMes(){
      this.getTotalTransacoes(this.userId, this.mesConsulta, this.tipoConsulta)
      this.getByMes(this.userId, this.mesConsulta)
  }

}
