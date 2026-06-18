import { HttpClient } from '@angular/common/http';
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

  url = 'https://financaspessoais-back.onrender.com/transacao';

  getAll(): Observable<Transacao[]>{
    return this.http.get<Transacao[]>(this.url)
  }

  getById(id: number):Observable<Transacao>{
    return this.http.get<Transacao>(this.url + "/" + id)
  }

  getByMes(userId: number, mesId: number): Observable<Transacao[]>{
    return this.http.get<Transacao[]>(this.url + "/mes/" + userId + "/" + mesId);
  }

  getTotalMes(userId: number, mesId:number): Observable<TransacaoUtil>{
    return this.http.get<TransacaoUtil>(this.url + "/" + userId + "/" + mesId + "/")
  }

  getTotalTransacoes(userId: number, mesId:number): Observable<SomaUtil>{
    return this.http.get<SomaUtil>(this.url + "/" + userId + "/" + mesId)
  }

  postTransacao(transacao: Transacao):Observable<Transacao>{
    return this.http.post<Transacao>(this.url, transacao)
  }

  editTransacao(transacao: Transacao): Observable<Transacao>{
    return this.http.put<Transacao>(this.url, transacao)
  }

  deleteTransacao(id: number){
    return this.http.delete(this.url + "/" + id)
  }

}
