import { Component, OnInit } from '@angular/core';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Tecnico } from 'src/Models/Tecnico';
import { Storage } from '@ionic/storage';
import { Chat } from 'src/Models/Chat';
import { ChatService } from 'src/app/services/chat.service';
import { Cliente } from 'src/Models/Cliente';

@Component({
  selector: 'app-technician-detail',
  templateUrl: './technician-detail.component.html',
  styleUrls: ['./technician-detail.component.scss'],
})
export class TechnicianDetailComponent implements OnInit {
  tecnico: Tecnico;
  cliente: Cliente;
  chat: Chat;
  tecnic1: any = [];
  tenicoId: number;

  tecnic: Tecnico;
  userTecnico: string;
  userCliente: string;

  constructor(
    private chatService: ChatService,
    private tecnicoService: TecnicoService,
    private router: Router,
    private route: ActivatedRoute, private storage: Storage
    ) {
      this.tenicoId = this.route.snapshot.params.id;
    }

  ngOnInit() {}

  ionViewWillEnter() {
    this.verifyUser();
    console.log(this.tenicoId);
  }

  //paso 2 Agregar el verifyuser
  verifyUser() {
    this.storage.get('userTecnico').then((usuario) => {
      // asi obtenego el aid del cliente ejemplo
      // const test = this.tecnic.tecnicoid;
      if (usuario) {
        this.tecnic = usuario;
        this.userTecnico = 'found';
        // this.appPages = this.appPagesTecnico;
      } else {
        this.storage.get('userCliente').then((usuarioC) => {
          if (usuarioC) {
            this.userCliente = 'found';
            // this.appPages = this.appPagesClient;
            this.getTecnico();
          }
        });
      }
    });
  }

  ValidateChatByTecnicoCliente() {
    this.storage.get('userCliente').then((val) => {
      this.cliente = val;
      console.log(this.cliente, this.tecnic1);
      this.chatService
        .GetChatByClienteTecnico(this.cliente.clienteid, this.tecnic1.tecnicoid)
        .subscribe((data) => {
          console.log(data);
          if (data) {
            this.router.navigate([`../../../search-proyect/technicianContact/${this.tecnic1.tecnicoid}`]);
          } else {
            this.chat = new Chat();
            this.chat.clienteid = this.cliente.clienteid;
            this.chat.tecnicoid = this.tecnic1.tecnicoid;
            this.chatService.crearChat(this.chat).subscribe((data: Chat) => {
              this.router.navigate([`../../../search-proyect/technicianContact/${this.tecnic1.tecnicoid}`]);
            });
          }
        });
    });
  }


  getTecnico() {
    this.tecnicoService.GetTecnicoById(this.tenicoId).subscribe((Itecnico: Tecnico) => {
      this.tecnico = Itecnico;
      this.tecnic1 = this.tecnico;
      console.log(this.tecnico);
    });
  }

}
