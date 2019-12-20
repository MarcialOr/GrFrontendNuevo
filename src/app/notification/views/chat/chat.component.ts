import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/Models/Chat';
import { Tecnico } from 'src/Models/Tecnico';
import { Cliente } from 'src/Models/Cliente';
import { ChatService } from 'src/app/services/chat.service';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ChatDetalle } from 'src/Models/ChatDetalle';
import { ChatdetalleService } from 'src/app/services/chatdetalle.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  clienteid: number;
  tecnicoid: number;
  chat: Chat;
  cliente: Cliente;
  chatdetalle: ChatDetalle;
  chats: ChatDetalle[];
  chatsDriver: ChatDetalle[];
  chatsCustomer: any = [];
  mensaje: string;
  chat2: Chat;
  existeChar: boolean;
  chatid: number;
  dueno: string;

  tecnic: Tecnico;
  tecnico: Tecnico;
  userTecnico: string;
  userCliente: string;

  constructor(
    private chatService: ChatService,
    private tecnicoService: TecnicoService,
    private chatDetalleService: ChatdetalleService,
    private router: Router, private storage: Storage,
    private route: ActivatedRoute,
    ) {
    // tslint:disable-next-line: radix
    this.tecnicoid = parseInt(this.route.snapshot.params.id);
    }

  ngOnInit() {}

  ionViewWillEnter() {
    this.verifyUser();
  }

 //paso 2 Agregar el verifyuser
 verifyUser() {
  this.storage.get('userCliente').then((usuarioC) => {
    if (usuarioC) {
      this.cliente = usuarioC;
      this.dueno = 'msjCustomer';
      this.getChatByTecnicoCliente(this.cliente.clienteid, this.tecnicoid);
    }else {
      this.storage.get('userTecnico').then((tecnico) => {
        this.dueno = 'msjDriver';
        this.tecnico = tecnico;
        this.getChatByTecnicoCliente(this.tecnicoid, this.tecnico.tecnicoid);
      });
    }
  });
}

getChatByTecnicoCliente(clienteid: number, tecnicoid: number) {
  this.chatService
    .GetChatByClienteTecnico(clienteid, tecnicoid)
    .subscribe((data) => {
      this.chat2 = data;
      this.chatid = this.chat2.chatid;
      this.getChats(this.chat2.chatid);
    });
}

getChats(id: number) {
  this.chatDetalleService.GetChatDetalleByChatId(id).subscribe(data => {
    this.chats = data;
    this.chatsCustomer = this.chats;
    this.chatsCustomer.forEach(element => {
      if (element.dueno === 'msjCustomer') {
        element.color = 'primary';
        element.slot = 'end';
      } else {
        element.slot = 'start';
        element.color = 'dark';
      }
    })
  });
}

// crearChatDetalle() {
//   this.storage.get('userCliente').then(cliente => {
//     if (cliente) {
//       this.crearChatDetail('msjCustomer');
//     } else {
//       this.crearChatDetail('msjDriver');
//     }
//   });
// }

crearChatDetail() {
  console.log(this.dueno);
  this.chatdetalle = new ChatDetalle();
  this.chatdetalle.chatid = this.chatid;
  this.chatdetalle.mensaje = this.mensaje;
  this.chatdetalle.dueno = this.dueno;
  this.chatDetalleService.crearChatDetalle(this.chatdetalle).subscribe(() => {
    this.getChats(this.chatid);
  });
}
}
