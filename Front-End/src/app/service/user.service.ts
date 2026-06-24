import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from 'src/model/Usuario';
import { UsuarioLogin } from 'src/model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly storageKeys = {
    id: 'financas.id',
    nome: 'financas.nome',
    email: 'financas.email',
    token: 'financas.token'
  }

  constructor(
    private http: HttpClient,
    public router: Router
    ) { }

    url = 'https://financaspessoais-back.onrender.com/usuario';

  refreshToken() {
    this.restoreSession()
  }

  setSession(usuarioLogin: UsuarioLogin) {
    environment.id = usuarioLogin.id
    environment.nome = usuarioLogin.nome
    environment.email = usuarioLogin.email
    environment.token = usuarioLogin.token

    sessionStorage.setItem(this.storageKeys.id, String(usuarioLogin.id))
    sessionStorage.setItem(this.storageKeys.nome, usuarioLogin.nome)
    sessionStorage.setItem(this.storageKeys.email, usuarioLogin.email)
    sessionStorage.setItem(this.storageKeys.token, usuarioLogin.token)
  }

  restoreSession() {
    const token = sessionStorage.getItem(this.storageKeys.token)

    if (!token) {
      return
    }

    environment.id = Number(sessionStorage.getItem(this.storageKeys.id) || 0)
    environment.nome = sessionStorage.getItem(this.storageKeys.nome) || ''
    environment.email = sessionStorage.getItem(this.storageKeys.email) || ''
    environment.token = token
  }

  clearSession() {
    sessionStorage.removeItem(this.storageKeys.id)
    sessionStorage.removeItem(this.storageKeys.nome)
    sessionStorage.removeItem(this.storageKeys.email)
    sessionStorage.removeItem(this.storageKeys.token)

    environment.id = 0
    environment.nome = ''
    environment.email = ''
    environment.token = ''
  }

  getAll(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url)
  }

  getByIdUser(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(this.url + "/" + id)
  }

  logar(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin>{
    return this.http.post<UsuarioLogin>(this.url + "/login", usuarioLogin)
  }

  cadastrar(usuario: Usuario){
    return this.http.post<Usuario>(this.url + "/cadastrar", usuario)
  }

  editar(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(this.url + "/atualizar", usuario)
  }

  // Verifica se o usuário está logado através do Token armazenado no environment.
  logado(){
    return environment.token !== '' || !!sessionStorage.getItem(this.storageKeys.token)
  }

}
