import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransacaoService } from 'src/app/service/transacao.service';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environment.prod';
import { Transacao } from 'src/model/Transacao';
import { Usuario } from 'src/model/Usuario';

@Component({
  selector: 'app-economias',
  templateUrl: './economias.component.html',
  styleUrls: ['./economias.component.css']
})
export class EconomiasComponent implements OnInit {

  user: Usuario = new Usuario();
  transacao: Transacao = new Transacao();

  idUser = environment.id;
  listaTransacoes: Transacao[];
  listaInvestimentos : Transacao[] = [];

  economiaTotal: number = 0;
  economiaMesAtual: number = 0;
  mesAtual: number;

  catDesc: string;
  mesDesc: string;

  // Order pipe
  key = 'data'
  reverse = true

  constructor(
    private userService: UserService,
    private transacaoService: TransacaoService,
    private router: Router
  ) { }

  ngOnInit(){
    window.scroll(0, 0)

    if(environment.token == ""){
      this.router.navigate(['/']);
    }

    this.userService.refreshToken()
    this.getMesAtual()
    this.findByIdUser()
  }

  getMesAtual(){
    let data = new Date();
    this.mesAtual = data.getMonth() + 1
  }

  findByIdUser(){
    this.userService.getByIdUser(this.idUser).subscribe((resp: Usuario) => {
      this.user = resp

      this.listaTransacoes = this.user.transacao
      this.economias()
    })
  }

  getByIdTransacao(id: string){
    this.transacaoService.getById(Number(id)).subscribe((resp: Transacao) => {
      this.transacao = resp

      this.catDesc = this.transacao.categoria.descricao
      this.mesDesc = this.transacao.mes.descricao
    })

  }

  economias(){
    for(let item of this.listaTransacoes){

      if(item.categoria.descricao == "Investimento"){
        this.listaInvestimentos.push(item)
        this.economiaTotal += item.valor
      }

      if(item.mes.id == this.mesAtual && item.categoria.descricao == "Investimento"){
        this.economiaMesAtual += item.valor
      }
    }
  }


}
