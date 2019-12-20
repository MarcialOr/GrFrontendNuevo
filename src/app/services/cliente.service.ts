import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from 'src/Models/Cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  clienteTemp: Cliente;

  apiUrl = 'https://localhost:5001/api/cliente';

  constructor(private http: HttpClient) { }

  crearCliente(cliente: Cliente) {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  GetClienteById(id: number ) {
    return this.http.get<Cliente>(this.apiUrl  + '/' + id);
  }

  GetClienteByUserName( correo: string, password: string) {
    return this.http.get<Cliente>(this.apiUrl  + `/bycorreo/${correo}/${password}`);
  }
}
