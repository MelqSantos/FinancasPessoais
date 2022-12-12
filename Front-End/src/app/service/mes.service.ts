import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Mes } from 'src/model/Mes';

@Injectable({
  providedIn: 'root'
})
export class MesService {

  constructor(private http: HttpClient) { }

  url = 'https://financaspessoais-api.up.railway.app/mes';
  
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAll(): Observable<Mes[]>{
    return this.http.get<Mes[]>(this.url, this.token)
  }

  getByIdMes(id: number): Observable<Mes>{
    return this.http.get<Mes>(this.url + "/" + id, this.token)
  }
}
