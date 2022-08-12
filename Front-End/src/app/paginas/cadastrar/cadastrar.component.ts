import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
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
    private alerta: NotificationService
  ) { }

  ngOnInit(): void {
  }

  confirmSenha(event: any){
    this.confirmaSenha = event.target.value;
  }

  cadastrar(){
    // Validações dos campos
    if(this.user.senha != this.confirmaSenha){
      this.alerta.showError('As senhas não coincidem!', 'Erro')
    } 
    else{
      if(this.user.nome == undefined || this.user.email == undefined){
        this.alerta.showWarning('Favor verificar os campos vazios!', 'Atenção')
      } 
      else{
        // POST dos dados
        this.userService.cadastrar(this.user).subscribe((resp: Usuario) =>{
          this.user = resp;
  
          this.router.navigate(['/login'])
          this.alerta.showSuccess('Usuário cadastrado!', 'Sucesso')
        })
      }
    }
  }

}
