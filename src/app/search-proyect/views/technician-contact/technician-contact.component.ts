import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { ChatdetalleService } from 'src/app/services/chatdetalle.service';
import { Chat } from 'src/Models/Chat';
import { Storage } from '@ionic/storage';
import { ChatDetalle } from 'src/Models/ChatDetalle';
import { ThrowStmt } from '@angular/compiler';
import { Tecnico } from 'src/Models/Tecnico';
import { Cliente } from 'src/Models/Cliente';

@Component({
  selector: 'app-technician-contact',
  templateUrl: './technician-contact.component.html',
  styleUrls: ['./technician-contact.component.scss']
})
export class TechnicianContactComponent implements OnInit {
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

  tecnic: Tecnico;
  tecnico: Tecnico;
  userTecnico: string;
  userCliente: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService,
    private chatDetalleService: ChatdetalleService,
    private storage: Storage
  ) {
    // tslint:disable-next-line: radix
    this.tecnicoid = parseInt(this.route.snapshot.params.id);
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    //paso 3 pasar el html
    this.verifyUser();
  }

  //paso 2 Agregar el verifyuser
  verifyUser() {
    this.storage.get('userCliente').then((usuarioC) => {
      if (usuarioC) {
        this.cliente = usuarioC;
        this.getChatByTecnicoCliente(this.cliente.clienteid, this.tecnicoid);
      }
    });
  }

  getChatByTecnicoCliente(clienteid: number, tecnicoid: number) {
    this.chatService
      .GetChatByClienteTecnico(clienteid, tecnicoid)
      .subscribe((data) => {
        this.chat2 = data;
        this.chatid = this.chat2.chatid;
        console.log(this.chat2);
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
      console.log(this.chats);
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

  crearChatDetail(dueno: string) {
    this.chatdetalle = new ChatDetalle();
    this.chatdetalle.chatid = this.chatid;
    this.chatdetalle.mensaje = this.mensaje;
    this.chatdetalle.dueno = dueno;
    this.chatDetalleService.crearChatDetalle(this.chatdetalle).subscribe(() => {
      this.getChats(this.chatid);
    });
  }
}
