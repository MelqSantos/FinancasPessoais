import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Transacao } from 'src/model/Transacao';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {

  constructor(private http: HttpClient) { }

  url = 'https://ms-financaspessoais.herokuapp.com/transacao';

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAll(): Observable<Transacao[]>{
    return this.http.get<Transacao[]>(this.url, this.token)
  }

  getById(id: number):Observable<Transacao>{
    return this.http.get<Transacao>(this.url + "/" + id, this.token)
  }

  postTransacao(transacao: Transacao):Observable<Transacao>{
    return this.http.post<Transacao>(this.url, transacao, this.token)
  }

  editTransacao(transacao: Transacao): Observable<Transacao>{
    return this.http.put<Transacao>(this.url, transacao, this.token)
  }

  deleteTransacao(id: number){
    return this.http.delete(this.url + "/" + id, this.token)
  }

}
