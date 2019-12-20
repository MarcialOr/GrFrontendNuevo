import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Banca } from 'src/Models/Banca';

@Injectable({
  providedIn: 'root'
})
export class BancaService {
  apiUrl = 'https://localhost:5001/api/banca';

  constructor(private http: HttpClient) { }

  crearBancaInfo(banca: Banca) {
    return this.http.post<Banca>(this.apiUrl, banca);
  }
}
