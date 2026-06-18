import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Mes } from 'src/model/Mes';

@Injectable({
  providedIn: 'root'
})
export class MesService {

  constructor(private http: HttpClient) { }

  url = 'https://financaspessoais-back.onrender.com/mes';

  getAll(): Observable<Mes[]>{
    return this.http.get<Mes[]>(this.url)
  }

  getByIdMes(id: number): Observable<Mes>{
    return this.http.get<Mes>(this.url + "/" + id)
  }
}
