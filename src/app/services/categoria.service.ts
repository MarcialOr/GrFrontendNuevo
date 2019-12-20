import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from 'src/Models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  apiUrl = 'https://localhost:5001/api/categoria';

  constructor(private http: HttpClient) { }

  obtenerCategorias() {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  GetCategoriaById(id: number) {
    return this.http.get<Categoria>(this.apiUrl  + '/' + id);
  }
}
