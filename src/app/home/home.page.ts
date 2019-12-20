import { Component } from '@angular/core';
import { TecnicoService } from '../services/tecnico.service';
import { Tecnico } from 'src/Models/Tecnico';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tecnicos: Tecnico[];
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

  constructor(
    private tecnicoService: TecnicoService,
    public storage: Storage,
    public menuCtrl: MenuController,
    private router: Router,
  ) {}

  ngOnInit() {
    // this.obtenerTecnico();
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
      } else {
        this.storage.get('userCliente').then((usuarioC) => {
          if (usuarioC) {
            this.userCliente = 'found';
            this.appPages = this.appPagesClient;
            this.obtenerTecnico();
          }
        });
      }
    });
  }

  buscar( event ) {
    this.busqueda = event.detail.value;
  }


  obtenerTecnico(){
    this.tecnicoService.obtenerTecnicos().subscribe(data => {
      this.tecnicos = data;
      console.log(this.tecnicos);
      if(event) {}
    });
  }

  detalleTecnico(id) {
      this.router.navigate([`../search-proyect/technicianDetail/${id}`]);
  }

}
