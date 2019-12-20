import { Component, OnInit } from '@angular/core';
import { Tecnico } from 'src/Models/Tecnico';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';

import { HistoricotrabajoService } from 'src/app/services/historicotrabajo.service';
import { Historicotrabajo } from 'src/Models/Historicotrabajo';
import { Chat } from 'src/Models/Chat';
import { ChatDetalle } from 'src/Models/ChatDetalle';
import { ChatService } from 'src/app/services/chat.service';
import { ChatdetalleService } from 'src/app/services/chatdetalle.service';
import { Cliente } from 'src/Models/Cliente';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {

  clienteid: number;
  tecnicoid: number;
  chat3: Chat[];
  chat4: Chat[];

  chat: Chat;
  chatdetalle: ChatDetalle;
  chats: ChatDetalle[];
  mensaje: string;
  chat2: Chat;
  existeChar: boolean;
  chatid: number;

  tecnicos: Tecnico[];

  tecnic1: any = [];
  cliente1: any = [];
  cliente: Cliente;
  tecnic: Tecnico;
  tecnico: Tecnico;
  userTecnico: string;
  userCliente: string;

  busqueda: string;

//Paso 1 agregar el arreglo del sidebar
  public appPages = [];
  public appPagesClient = [
    {
      title: 'Panel De Control',
      url: '/home',
      icon: 'speedometer'
    },
    {
      title: 'Perfil',
      url: '/profile',
      icon: 'person'
    },
    {
      title: 'Buscar Tecnico',
      url: '/search-proyect',
      icon: 'search'
    },
    {
      title: 'Bandeja De Entrada',
      url: '/notification',
      icon: 'notifications'
    },
    {
      title: 'Mis Proyectos',
      url: '/projects',
      icon: 'clipboard'
    },
    {
      title: 'Configuración',
      url: '/setting',
      icon: 'cog'
    },
  ];
  public appPagesTecnico = [
    {
      title: 'Panel De Control',
      url: '/home',
      icon: 'speedometer'
    },
    {
      title: 'Perfil',
      url: '/profile',
      icon: 'person'
    },
    {
      title: 'Bandeja De Entrada',
      url: '/notification',
      icon: 'notifications'
    },
    {
      title: 'Mis Proyectos',
      url: '/projects',
      icon: 'clipboard'
    },
    {
      title: 'Configuración',
      url: '/setting',
      icon: 'cog'
    },
  ];

  constructor(private storage: Storage, private route: Router,
              private router: ActivatedRoute,
              private historicService: HistoricotrabajoService, private chatService: ChatService,
              private chatDetalleService: ChatdetalleService) {
                // tslint:disable-next-line: radix
                this.tecnicoid = this.router.snapshot.params.id;
              }

  ngOnInit() {
  }

  ionViewWillEnter() {
    //paso 3 pasar el html
    this.verifyUser();
  }

  //paso 2 Agregar el verifyuser
  verifyUser() {
    this.storage.get('userTecnico').then((usuario) => {
      // asi obtenego el aid del cliente ejemplo
      this.tecnic = usuario;
      // const test = this.tecnic.tecnicoid;
      if (usuario) {
        this.userTecnico = 'found';
        this.appPages = this.appPagesTecnico;
        this.getHistoricoChatTecnico();
      } else {
        this.storage.get('userCliente').then((usuarioC) => {
          if (usuarioC) {
            this.userCliente = 'found';
            this.appPages = this.appPagesClient;
            this.getHistoricoChatCliente();
          }
        });
      }
    });
  }

  buscar( event ) {
    this.busqueda = event.detail.value;
  }

  getHistoricoChatTecnico() {
    this.storage.get('userTecnico').then(val => {
      this.chatService.GetChatByTecnico(val.tecnicoid).subscribe(data => {
        this.chat3 = data;
        console.log(this.chat3);
      });
    });
  }

  getHistoricoChatCliente() {
    this.storage.get('userCliente').then(val => {
      this.chatService.GetChatByCliente(val.clienteid).subscribe(data => {
        this.chat4 = data;
      });
    });
  }

  ValidateChatByTecnicoClienteForCliente(id : number) {
    console.log(id);
    this.storage.get('userCliente').then((val) => {
      this.cliente = val;
      if (this.cliente) {
        console.log('entre');
        this.route.navigate([`../../../notification/chat/${id}`]);
      } else {
        console.log('entre');
        this.route.navigate([`../../../notification/chat/${id}`]);
      }
    });
  }

  ValidateChatByTecnicoClienteForTecnico() {
    // this.storage.get('userTecnico').then((val) => {
    //   this.tecnico = val;
    //   console.log(this.cliente1, this.tecnico);
    //   this.chatService
    //     .GetChatByClienteTecnico(this.cliente1.clienteid, this.tecnico.tecnicoid)
    //     .subscribe((data) => {
    //       console.log(data);
    //       if (data) {
    //         this.route.navigate([`../../../search-proyect/technicianContact/${this.cliente1.clienteid}`]);
    //       } else {
    //         this.chat = new Chat();
    //         this.chat.clienteid = this.cliente1.clienteid;
    //         this.chat.tecnicoid = this.tecnico.tecnicoid;
    //         this.chatService.crearChat(this.chat).subscribe((data: Chat) => {
    //           this.route.navigate([`../../../search-proyect/technicianContact/${this.cliente1.clienteid}`]);
    //         });
    //       }
    //     });
    // });
    this.route.navigate(['../../../notification/chat']);

  }
}
