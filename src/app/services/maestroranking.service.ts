import { Injectable } from '@angular/core';
import { Maestroranking } from 'src/Models/Maestroranking';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MaestrorankingService {
  apiUrl = 'https://localhost:5001/api/tecnico';

  constructor(private http: HttpClient) { }

  obtenerMaestrorankings() {
    return this.http.get<Maestroranking[]>(this.apiUrl);
  }

  crearMaestroranking(ranking: Maestroranking) {
    return this.http.post<Maestroranking>(this.apiUrl, ranking);
  }

  editMaestroranking(ranking: Maestroranking) {
    return this.http.put<Maestroranking>(this.apiUrl + '/' + ranking.rankingid, ranking);
  }

  GetMaestrorankingById(id: number ) {
    return this.http.get<Maestroranking>(this.apiUrl  + '/' + id);
  }

  GetMaestrorankingByUserName( correo: string, password: string) {
    return this.http.get<Maestroranking>(this.apiUrl  + `/bycorreo/${correo}/${password}`);
  }

  GetMaestrorankingByName(name: string){
    return this.http.get<Maestroranking>(this.apiUrl  + name);
  }
}
