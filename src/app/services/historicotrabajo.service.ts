import { Injectable } from '@angular/core';
import { Historicotrabajo } from 'src/Models/Historicotrabajo';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HistoricotrabajoService {
  apiUrl = 'https://localhost:5001/api/historicotrabajo';

  constructor(private http: HttpClient) { }

  obtenerHistoricotrabajos() {
    return this.http.get<Historicotrabajo[]>(this.apiUrl);
  }

  crearHistoricotrabajo(historico: Historicotrabajo) {
    return this.http.post<Historicotrabajo>(this.apiUrl, historico);
  }

  editHistoricotrabajo(historico: Historicotrabajo) {
    return this.http.put<Historicotrabajo>(this.apiUrl + '/' + historico.historicoid, historico);
  }

  GetHistoricotrabajoById(id: number ) {
    return this.http.get<Historicotrabajo>(this.apiUrl  + '/' + id);
  }

  GetHistoricotrabajoByUserName( correo: string, password: string) {
    return this.http.get<Historicotrabajo>(this.apiUrl  + `/bycorreo/${correo}/${password}`);
  }

  GetHistoricotrabajoByName(name: string) {
    return this.http.get<Historicotrabajo>(this.apiUrl  + name);
  }

  GetHistoricotrabajoByTecnico(id: number) {
    return this.http.get<Historicotrabajo[]>(this.apiUrl  + '/bytecnico/' + id);
  }

  GetHistoricotrabajoByCliente(id: number) {
    return this.http.get<Historicotrabajo[]>(this.apiUrl  + '/bycliente/' + id);
  }
}
