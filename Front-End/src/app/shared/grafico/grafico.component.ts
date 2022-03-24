import { Component, OnInit} from '@angular/core';
import { Chart } from 'chart.js';
import { MesService } from 'src/app/service/mes.service';
import { environment } from 'src/environments/environment.prod';
import { Mes } from 'src/model/Mes';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {

  listaMeses: Mes[];
  // Array que popula o gráfico
  listaDespesaMes: number[] = [];
  listaReceitaMes: number[] = [];
  idUser = environment.id
  somaDespesa: number = 0;
  somaReceita: number = 0;

  constructor(
    private mesService: MesService
  ) { }

  ngOnInit(){
    this.getAllMeses()
  }

  getAllMeses(){
    this.mesService.getAll().subscribe((resp: Mes[]) => {
      this.listaMeses = resp

      this.getDespesaMes()

      const myChart = new Chart('myChart', {
        type: 'line',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                label: 'Despesa',
                data: this.listaDespesaMes,
                borderColor: 'rgba(255, 99, 132, 1)',
                pointRadius: 4,
                borderWidth: 1.5,
                tension: 0.1
            },
            {
              label: 'Receita',
              data: this.listaReceitaMes,
              borderColor: '#17a2b8',
              pointRadius: 4,
              borderWidth: 1.5,
              tension: 0.1
          }
          ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    })
    
  }

  // Busca as despesas de cada mês para popular o gráfico
  getDespesaMes(){
    for(let mes of this.listaMeses){
      this.somaDespesa = 0
      this.somaReceita = 0
        
      for(let transacao of mes.transacao){
        if(transacao.usuario.id == this.idUser && transacao.tipo == "Despesa"){
          this.somaDespesa += transacao.valor
        } 
        if(transacao.usuario.id == this.idUser && transacao.tipo == "Receita"){
          this.somaReceita += transacao.valor
        }
      }
        this.listaDespesaMes.push(this.somaDespesa)
        this.listaReceitaMes.push(this.somaReceita)
      }
    }


}
