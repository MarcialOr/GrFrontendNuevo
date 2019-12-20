import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Usuario } from 'src/Models/Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router: Router,
    public storage: Storage,
  ) {
    this.initializeApp();
  }

  ngOnInit() {}

  ionViewWillEnter() {
    const array = [
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
        url: '/request',
        icon: 'notifications'
      },
      {
        title: 'Mis Proyectos',
        url: '/home',
        icon: 'clipboard'
      },
      {
        title: 'Configuración',
        url: '/setting',
        icon: 'cog'
      },
    ];
    const array2 = [
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
        url: '/home',
        icon: 'notifications'
      },
      {
        title: 'Mis Proyectos',
        url: '/home',
        icon: 'clipboard'
      },
      {
        title: 'Configuración',
        url: '/setting',
        icon: 'cog'
      },
    ];
    this.storage.get('userTecnico').then((usuario) => {
      console.log(usuario);
      if (usuario) {
        this.appPages = array2;
      } else {
        this.storage.get('userCliente').then((usuarioC) => {
          console.log(usuarioC);
          if (usuarioC) {
            this.appPages = array;
          }
        });
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
