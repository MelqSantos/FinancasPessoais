import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { SomaUtil } from 'src/model/SomaUtil';
import { Transacao } from 'src/model/Transacao';
import { TransacaoUtil } from 'src/model/TransacaoUtil';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {

  constructor(private http: HttpClient) { }

  url = 'https://financaspessoais-api.up.railway.app/transacao';

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAll(): Observable<Transacao[]>{
    return this.http.get<Transacao[]>(this.url, this.token)
  }

  getById(id: number):Observable<Transacao>{
    return this.http.get<Transacao>(this.url + "/" + id, this.token)
  }

  getByMes(userId: number, mesId: number): Observable<Transacao[]>{
    return this.http.get<Transacao[]>(this.url + "/mes/" + userId + "/" + mesId, this.token);
  }

  getTotalMes(userId: number, mesId:number): Observable<TransacaoUtil>{
    return this.http.get<TransacaoUtil>(this.url + "/" + userId + "/" + mesId + "/", this.token)
  }

  getTotalTransacoes(userId: number, mesId:number): Observable<SomaUtil>{
    return this.http.get<SomaUtil>(this.url + "/" + userId + "/" + mesId, this.token)
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
