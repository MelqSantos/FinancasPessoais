import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AlertaService } from './service/alerta.service';
import { UserService } from './service/user.service';
import { Usuario } from 'src/model/Usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: Usuario = new Usuario()
  
constructor(
  public userService: UserService,
  public router: Router,
  public alerta: AlertaService 
){}

ngOnInit(){
  window.scroll(0, 0);
}

// Togle menu lateral
toggle(){
  let menu: HTMLElement = document.querySelector('#sidebar') as HTMLElement
  menu.classList.toggle('active')
}

// Função para limpar os dados do usuário e deslogar
sair(){
  this.router.navigate(['/login'])
  this.alerta.showAlertInfo('Usuário deslogado com sucesso!')
  environment.id = 0;
  environment.nome = '';
  environment.email = '';
  environment.token = '';
}

}
