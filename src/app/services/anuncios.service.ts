import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Anuncio } from 'src/Models/Anuncio';

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {
  apiUrl = 'https://localhost:5001/api/anuncio';

  constructor(private http: HttpClient) { }

  obtenerAnuncios() {
    return this.http.get<Anuncio[]>(this.apiUrl);
  }
}
