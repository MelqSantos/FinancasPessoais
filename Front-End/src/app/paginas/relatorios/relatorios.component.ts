import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MesService } from 'src/app/service/mes.service';
import { TransacaoService } from 'src/app/service/transacao.service';
import { ExcelClass } from 'src/app/shared/excel-class';
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
    private transacaoService: TransacaoService,
    private excelClass: ExcelClass 
  ) { }

  listaMeses: Mes[];
  transacoesMes: Transacao[];
  totalTransacoes: SomaUtil;

  userId = environment.id;
  mesDesc: string;
  mesConsulta: number;

  // Excel
  fileName: string = '';
  dadosExcel: any[] = [];
  columns: any[];
  footerData: any[][] = [];
  despesas = 0;
  receitas = 0;
  saldo = 0;


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
     // Excel
    this.columns = ['Núm. da transação','Descrição','Tipo','Categoria','Mês', 'Valor']
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

  exportExcel(): void {
  
    let meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho', 'Agosto','Setembro','Outubro','Novembro','Dezembro']

    // Nome do arquivo a ser exportado
    this.fileName= 'Relatório_' + meses[this.mesConsulta - 1] + '.xlsx';
 
      for(let dado of this.transacoesMes){

        this.dadosExcel.push({
          Id: dado.id,
          Descrição: dado.descricao,
          Tipo: dado.tipo,
          Categoria: dado.categoria.descricao,
          Mês: dado.mes.descricao,
          Valor: dado.valor
        })
        
        if(dado.tipo == 'Despesa'){
          this.despesas += dado.valor
        } else if(dado.tipo == 'Receita'){
           this.receitas += dado.valor 
        }

        this.saldo = this.receitas - this.despesas;
      }

    // Soma das transações
    // this.footerData.push(['Receitas', '', '', '', '', this.receitas]);
    // this.footerData.push(['Despesas', '', '', '', '', this.despesas]);
    this.footerData.push(['Saldo', '', '', '', '', this.saldo]);
    
    // Criação do arquivo Excel
    let mes = meses[this.mesConsulta - 1]
    this.excelClass.exportAsExcelFile(`Relatório de gastos - ${mes}`, '',this.columns, this.dadosExcel, this.footerData, `Relatório ${mes}`, mes)

    this.dadosExcel = []
    this.footerData = []
    this.despesas = 0
    this.receitas = 0
    this.saldo = 0
  }

}
