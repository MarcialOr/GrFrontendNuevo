import { Component, OnInit } from '@angular/core';
import { Historicotrabajo } from 'src/Models/Historicotrabajo';
import { Tecnico } from 'src/Models/Tecnico';
import { Router } from '@angular/router';
import { HistoricotrabajoService } from 'src/app/services/historicotrabajo.service';
import { Storage } from '@ionic/storage';
import { Cliente } from 'src/Models/Cliente';

@Component({
  selector: 'app-show-projects',
  templateUrl: './show-projects.component.html',
  styleUrls: ['./show-projects.component.scss'],
})
export class ShowProjectsComponent implements OnInit {

  historicos: Historicotrabajo[];
  tecnicos: Tecnico[];
  tecnic: Tecnico;
  clien: Cliente;
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
              private historicService: HistoricotrabajoService) { }

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
        console.log('entre tecnico');
        this.userTecnico = 'found';
        this.appPages = this.appPagesTecnico;
        this.getHistoricoTrabajos(this.tecnic.tecnicoid);
      } else {
        this.storage.get('userCliente').then((usuarioC) => {
          this.clien = usuarioC;
          if (usuarioC) {
            console.log('entre cliente');
            this.userCliente = 'found';
            this.appPages = this.appPagesClient;
            this.getHistoricoTrabajosCliente(this.clien.clienteid);
          }
        });
      }
    });
  }

  buscar( event ) {
    this.busqueda = event.detail.value;
  }

  getHistoricoTrabajos(tecnicId) {
      this.historicService.GetHistoricotrabajoByTecnico(tecnicId).subscribe(data => {
        this.historicos = data;
    });
  }

  getHistoricoTrabajosCliente(clienteId) {
    this.historicService.GetHistoricotrabajoByCliente(clienteId).subscribe(data => {
      this.historicos = data;
      console.log(this.historicos);
  });
}

  verSolicitudDetalle(id: number) {
    this.route.navigate([`../projects/solicitudDetalle/${id}`]);
  }
}
