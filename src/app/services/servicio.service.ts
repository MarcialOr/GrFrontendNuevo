import { Injectable } from '@angular/core';
import { Servicio } from 'src/Models/Servicio';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  apiUrl = 'https://localhost:5001/api/servicio';

  constructor(private http: HttpClient) { }

  obtenerServicios() {
    return this.http.get<Servicio[]>(this.apiUrl);
  }

}
