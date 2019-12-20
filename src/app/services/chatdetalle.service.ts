import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatDetalle } from 'src/Models/ChatDetalle';

@Injectable({
  providedIn: 'root'
})
export class ChatdetalleService {

  apiUrl = 'https://localhost:5001/api/chatdetalle';

  constructor(private http: HttpClient) { }

  crearChatDetalle(chat: ChatDetalle) {
    return this.http.post<ChatDetalle>(this.apiUrl, chat);
  }

  GetChatDetalleById(id: number ) {
    return this.http.get<ChatDetalle>(this.apiUrl  + '/' + id);
  }

  GetChatDetalleByChatId(id: number ) {
    return this.http.get<ChatDetalle[]>(this.apiUrl  + '/bychatid/' + id);
  }


}
