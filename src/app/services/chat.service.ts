import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chat } from 'src/Models/Chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  apiUrl = 'https://localhost:5001/api/Chat';

  constructor(private http: HttpClient) { }

  crearChat(chat: Chat) {
    return this.http.post<Chat>(this.apiUrl, chat);
  }

  GetChatById(id: number ) {
    return this.http.get<Chat>(this.apiUrl  + '/' + id);
  }

  GetChatByClienteTecnico(clienteid: number, tecnicoid: number ) {
    return this.http.get<Chat>(this.apiUrl  + '/' + clienteid + '/' + tecnicoid);
  }

  obtenerChats() {
    return this.http.get<Chat[]>(this.apiUrl);
  }

  GetChatByTecnico(id: number) {
    return this.http.get<Chat[]>(this.apiUrl  + '/bytecnico/' + id);
  }

  GetChatByCliente(id: number) {
    return this.http.get<Chat[]>(this.apiUrl  + '/bycliente/' + id);
  }
}
