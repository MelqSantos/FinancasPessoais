import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserService } from './service/user.service';
import { Usuario } from 'src/model/Usuario';
import { NotificationService } from './service/notification.service';
import { LoaderService } from './paginas/components/loader.service';

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
  public alerta: NotificationService,
  public loaderService: LoaderService
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
  this.alerta.showInfo('Usuário deslogado!', 'Sucesso')
  environment.id = 0;
  environment.nome = '';
  environment.email = '';
  environment.token = '';
}

}
