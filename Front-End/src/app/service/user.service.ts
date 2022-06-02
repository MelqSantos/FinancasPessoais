import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from 'src/model/Usuario';
import { UsuarioLogin } from 'src/model/UsuarioLogin';
import { AlertaService } from './alerta.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    public router: Router,
    public alerta: AlertaService
    ) { }

    url = 'http://localhost:8080/usuario';

    token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

  getAll(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url, this.token)
  }

  getByIdUser(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(this.url + "/" + id, this.token)
  }

  logar(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin>{
    return this.http.post<UsuarioLogin>(this.url + "/login", usuarioLogin)
  }

  cadastrar(usuario: Usuario){
    return this.http.post<Usuario>(this.url + "/cadastrar", usuario)
  }

  editar(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(this.url + "/atualizar", usuario, this.token)
  }

  // Verifica se o usuário está logado através do Token armazenado no environment.
  logado(){
    let ok: boolean = false
    
    if(environment.token != ''){
      ok = true
    }

    return ok
  }

}
