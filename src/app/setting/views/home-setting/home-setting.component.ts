import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Tecnico } from 'src/Models/Tecnico';

@Component({
  selector: 'app-home-setting',
  templateUrl: './home-setting.component.html',
  styleUrls: ['./home-setting.component.scss'],
})
export class HomeSettingComponent implements OnInit {

  tecnic: Tecnico;
  tecnico: Tecnico;
  userTecnico: string;
  userCliente: string;

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

  constructor(private storage: Storage, private router: Router) { }

  ngOnInit() {}

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
          }
        });
      }
    });
  }

  onLogout() {
    this.storage.remove('userTecnico');
    this.storage.remove('userCliente');
    this.router.navigate(['auth']);
  }
}
