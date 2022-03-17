import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertaService } from 'src/app/service/alerta.service';
import { UserService } from 'src/app/service/user.service';
import { Usuario } from 'src/model/Usuario';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: Usuario = new Usuario();
  confirmaSenha: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private alerta: AlertaService
  ) { }

  ngOnInit(): void {
  }

  confirmSenha(event: any){
    this.confirmaSenha = event.target.value;
  }

  cadastrar(){
    
    if(this.user.senha != this.confirmaSenha){
      this.alerta.showAlertDanger('As senhas não coincidem.')
    } else{

      this.userService.cadastrar(this.user).subscribe((resp: Usuario) =>{
        this.user = resp;

        this.router.navigate(['/login'])
        this.alerta.showAlertSuccess('Usuário cadastrado com sucesso!')
      })

    }
  }

}
