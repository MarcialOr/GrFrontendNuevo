import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tecnico } from 'src/Models/Tecnico';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {
  tecnicoTemp: Tecnico;

  apiUrl = 'https://localhost:5001/api/tecnico';

  constructor(private http: HttpClient) { }

  obtenerTecnicos() {
    return this.http.get<Tecnico[]>(this.apiUrl);
  }

  crearTecnico(tecnico: Tecnico) {
    return this.http.post<Tecnico>(this.apiUrl, tecnico);
  }

  editTecnico(tecnico: Tecnico) {
    return this.http.put<Tecnico>(this.apiUrl + '/' + tecnico.tecnicoid, tecnico);
  }

  GetTecnicoById(id: number ) {
    return this.http.get<Tecnico>(this.apiUrl  + '/' + id);
  }

  GetTecnicoByUserName( correo: string, password: string) {
    return this.http.get<Tecnico>(this.apiUrl  + `/bycorreo/${correo}/${password}`);
  }

  GetTecnicoByName(name: string){
    return this.http.get<Tecnico>(this.apiUrl  + name);
  }

  GetTecnicoByCategoria(id: number) {
    return this.http.get<Tecnico[]>(this.apiUrl  + '/bycategoria/' + id);
  }
}
