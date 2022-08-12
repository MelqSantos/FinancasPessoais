import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from 'src/model/Usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  user: Usuario = new Usuario();
  confirmaSenha: string;

  constructor(
    private userService: UserService,
    private alerta: NotificationService,
    private router: Router
  ) { }

  ngOnInit(){
    window.scroll(0, 0)

    if(environment.token == ""){
      this.router.navigate(['/'])
    }

    this.getByIdUser()
  }

  confirmSenha(event: any){
    this.confirmaSenha = event.target.value;
  }

  getByIdUser(){
    this.userService.refreshToken()
    
    this.userService.getByIdUser(environment.id).subscribe((resp: Usuario) => {
      this.user = resp
      this.user.senha = ''
    })
  }

  atualizar(){
    this.userService.editar(this.user).subscribe((resp : Usuario) => {
      this.user = resp
      
      this.alerta.showInfo('Usuário alterado com sucesso, faça login novamente!', 'Sucesso')
      this.router.navigate(['/login'])
      environment.id = 0;
      environment.nome = '';
      environment.email = '';
      environment.token = '';
    },
    error => {
      this.alerta.showWarning('Entre em contato com o administrador!', `Erro HTTP: ${error.status}`)
    })
  }

}
