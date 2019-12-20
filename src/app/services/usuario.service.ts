import { Injectable } from '@angular/core';
import { Usuario } from 'src/Models/Usuario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  apiUrl = 'https://localhost:5001/api/usuario';

  constructor(private http: HttpClient) { }

  obtenerUsuario() {
    return this.http.get(this.apiUrl);
  }

  GetUsuarioByUserName(correo: string, clave: string ) {
    return this.http.get<Usuario>(this.apiUrl + '/' + correo + '/' + clave );
  }

  GetUsuarioByName(name: string ) {
    return this.http.get<Usuario>(this.apiUrl + '/user/' + name  );
  }

  crearUsuario(usuario: Usuario) {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  editUsuario(usuario: Usuario){
    return this.http.put<Usuario>(this.apiUrl + '/' + usuario.usuarioid, usuario);
  }
}
