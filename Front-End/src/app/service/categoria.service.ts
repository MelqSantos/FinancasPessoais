import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from 'src/model/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private http: HttpClient
  ) { }

  url = 'https://ms-financaspessoais.herokuapp.com/categoria';

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllCategorias(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.url, this.token)
  }

  getByIdCategoria(id: number): Observable<Categoria>{
    return this.http.get<Categoria>(this.url + "/" + id, this.token)
  }

  postCategoria(categoria: Categoria): Observable<Categoria>{
    return this.http.post<Categoria>(this.url, categoria, this.token)
  }

  putCategoria(categoria: Categoria): Observable<Categoria>{
    return this.http.put<Categoria>(this.url, categoria, this.token)
  }

  deleteCategoria(id: number){
    return this.http.delete(this.url + "/" + id, this.token)
  }

}
