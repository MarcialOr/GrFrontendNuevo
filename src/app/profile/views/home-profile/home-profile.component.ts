import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, MenuController } from '@ionic/angular';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Tecnico } from 'src/Models/Tecnico';
import { Storage } from '@ionic/storage';
import { Cliente } from 'src/Models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-home-profile',
  templateUrl: './home-profile.component.html',
  styleUrls: ['./home-profile.component.scss'],
})
export class HomeProfileComponent implements OnInit {
  tecnic: Tecnico;
  cliente: Cliente;
  tenicoId: number;
  clienteId: number;
  userTecnico: string;
  userCliente: string;


  clienteById: Cliente;
  tecnicoById: Tecnico;
  tecnicos: any = [];

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

  constructor(public alertController: AlertController, private tecnicoService: TecnicoService,
              private toastController: ToastController, public storage: Storage,
              private menuCTRL: MenuController,
              private clienteService: ClienteService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCTRL.close();
    this.verifyUser();
    this.verifyUser1();
  }


  verifyUser() {
    this.storage.get('userTecnico').then((usuario) => {
      // asi obtenego el aid del cliente ejemplo
      if (usuario) {
        this.tecnic = usuario;
        this.tenicoId = this.tecnic.tecnicoid;
        this.getTecnico();
        this.userTecnico = 'found';
      } else {
        this.storage.get('userCliente').then((usuarioC) => {
          console.log(usuarioC);
          if (usuarioC) {
            this.userCliente = 'found';
            this.cliente = usuarioC;
            this.clienteId = this.cliente.clienteid;
            this.getCliente();
          }
        });
      }
    });
  }

  //paso 2 Agregar el verifyuser
  verifyUser1() {
    this.storage.get('userTecnico').then((usuario) => {
      // asi obtenego el aid del cliente ejemplo
      this.tecnic = usuario;
      // const test = this.tecnic.tecnicoid;
      if (usuario) {
        this.userTecnico = 'found';
        this.appPages = this.appPagesTecnico;
      } else {
        this.storage.get('userCliente').then((usuarioC) => {
          if (usuarioC) {
            this.userCliente = 'found';
            this.appPages = this.appPagesClient;
          }
        });
      }
    });
  }

  async presentAlertClient(msj, type) {
    const alert = await this.alertController.create({
      header: msj,
      inputs: [
        {
          name: 'update',
          type: 'text',
          placeholder: ''
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('confirm cancel');
          }
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if (type === 'address') {
              this.tecnic.direccion = data.update;
              this.updateProveedor();
            } else if (type === 'AboutMe') {
              this.tecnic.sobreMi = data.update;
              this.updateProveedor();
            }
          }
        },
      ],
    });
    await alert.present();
  }

  async presentAlertTecnic(msj, type) {
    const alert = await this.alertController.create({
      header: msj,
      inputs: [
        {
          name: 'update',
          type: 'text',
          placeholder: ''
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('confirm cancel');
          }
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if (type === 'address') {
              this.tecnic.direccion = data.update;
              this.updateProveedor();
            } else if (type === 'AboutMe') {
              this.tecnic.sobreMi = data.update;
              this.updateProveedor();
            } else if (type === 'budget') {
              this.tecnic.presupuesto = parseInt(data.update);
              this.updateProveedor();
            }
          }
        },
      ],
    });
    await alert.present();
  }

  getTecnico() {
    this.tecnicoService.GetTecnicoById(this.tenicoId).subscribe((data: Tecnico) => {
      this.tecnicoById = data;
      this.tecnicos = this.tecnicoById;
      console.log(this.tecnicoById);
    });
  }

  getCliente() {
    this.clienteService.GetClienteById(this.clienteId).subscribe((data: Cliente) =>{
      this.clienteById = data;
      this.cliente = this.clienteById;
      console.log(this.clienteById);
    });
  }

  updateProveedor() {
    this.tecnicoService.editTecnico(this.tecnic).subscribe((tecnico: Tecnico) => {
      // this.storage.set('userTecnico', tecnic);
      this.getTecnico();
    });
  }

  async presentToast(msj) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000
    });
    toast.present();
  }

}
