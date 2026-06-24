import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
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
    private alerta: NotificationService
  ) { }

  ngOnInit(): void {
    if (this.userService.logado()) {
      this.router.navigate(['/transacoes']);
    }
  }

  logar(){
    this.userService.logar(this.userLogin).subscribe((resp: UsuarioLogin) =>{
      this.userLogin = resp;
      this.userService.setSession(this.userLogin)

      this.router.navigate(['/transacoes'])
    }, erro =>{
      if(erro.status == 500 || erro.status == 401){
        this.alerta.showError('Usuário ou senha incorretos!', 'Erro')
      }
    })
  }
}
