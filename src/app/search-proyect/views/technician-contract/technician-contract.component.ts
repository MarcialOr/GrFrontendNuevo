import { Component, OnInit } from '@angular/core';
import { Historicotrabajo } from 'src/Models/Historicotrabajo';
import { Tecnico } from 'src/Models/Tecnico';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoricotrabajoService } from 'src/app/services/historicotrabajo.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-technician-contract',
  templateUrl: './technician-contract.component.html',
  styleUrls: ['./technician-contract.component.scss']
})
export class TechnicianContractComponent implements OnInit {
  historicoid: number;
  clienteid: number;
  tecnicoid: number;
  descripcion: string;
  precio: number;
  rankingid: number;
  estado: number;
  historico: Historicotrabajo;
  cliente: any;
  tecnico: Tecnico;
  tecnic: any = [];

  tecnic1: Tecnico;
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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private historicoService: HistoricotrabajoService,
    private tecnicoService: TecnicoService,
    private storage: Storage
  ) {
    // tslint:disable-next-line: radix
    this.tecnicoid = parseInt(this.route.snapshot.params.id);
  }

  ngOnInit() {}

  ionViewWillEnter() {
    //paso 3 pasar el html
    this.verifyUser();
    console.log(this.tecnicoid);
    this.getTecnico();
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

  getTecnico() {
    this.tecnicoService
      .GetTecnicoById(this.tecnicoid)
      .subscribe((Itecnico: Tecnico) => {
        this.tecnico = Itecnico;
        this.tecnic1 = this.tecnico;
        console.log(this.tecnico);
      });
  }

  enviarAlTecnico() {
    this.storage.get('userCliente').then(val => {
      this.historico = new Historicotrabajo();
      this.historico.clienteid = val.clienteid;
      this.historico.tecnicoid = this.tecnicoid;
      this.historico.descripcion = this.descripcion;
      this.historico.precio = 0;

      this.historicoService
        .crearHistoricotrabajo(this.historico)
        .subscribe((data: Historicotrabajo) => {
          console.log('Id Historico: ' + this.historico.historicoid);
          console.log('Enviando un mensaje al tecnico!');
          console.log('Id Tecnico' + this.historico.tecnicoid);
          console.log('Id Cliente' + this.historico.clienteid);
          this.router.navigate(['home']);
        });
    });
  }
}
