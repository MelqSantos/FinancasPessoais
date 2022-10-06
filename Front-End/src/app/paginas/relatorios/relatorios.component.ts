import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MesService } from 'src/app/service/mes.service';
import { TransacaoService } from 'src/app/service/transacao.service';
import { environment } from 'src/environments/environment.prod';
import { Mes } from 'src/model/Mes';
import { SomaUtil } from 'src/model/SomaUtil';
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
  totalTransacoes: SomaUtil;

  userId = environment.id;
  mesDesc: string;
  mesConsulta: number;

  ngOnInit() {
    if (environment.token == "") {
      this.router.navigate(['/']);
    }

     // Busca a data atual
     var data: Date = new Date()
     this.mesConsulta = data.getMonth() + 1
     
     this.getAllMeses();
     this.getTotalTransacoesMes(this.userId, this.mesConsulta); 
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
    this.transacaoService.getTotalTransacoes(userId, mesId).subscribe((resp: SomaUtil) => {
      this.totalTransacoes = resp;
    })
  }

  trMesId(event: any) {
    this.mesConsulta = event.target.value
    this.getAllMeses();
  }

  searchByMes(){
      this.getTotalTransacoesMes(this.userId, this.mesConsulta)
      this.getByMes(this.userId, this.mesConsulta)
      this.getAllMeses();
  }

}
