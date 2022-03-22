import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertaService } from 'src/app/service/alerta.service';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from 'src/model/UsuarioLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UsuarioLogin = new UsuarioLogin();

  constructor(
    private userService: UserService,
    private router: Router,
    private alerta: AlertaService
  ) { }

  ngOnInit(): void {
  }

  logar(){
    this.userService.logar(this.userLogin).subscribe((resp: UsuarioLogin) =>{
      this.userLogin = resp;

      environment.id = this.userLogin.id
      environment.nome = this.userLogin.nome
      environment.email = this.userLogin.email
      environment.token = this.userLogin.token

      this.router.navigate(['/transacoes'])
    }, erro =>{
      if(erro.status == 500 || erro.status == 401){
        this.alerta.showAlertDanger("Usuário ou senha incorretos!")
      }
    })
  }
}
