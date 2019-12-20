import { Component, OnInit } from '@angular/core';
import { Tecnico } from 'src/Models/Tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-technicians',
  templateUrl: './technicians.component.html',
  styleUrls: ['./technicians.component.scss'],
})
export class TechniciansComponent implements OnInit {

  tecnicos: Tecnico[];
  tecnicoById: number;
  tecnico: Tecnico;
  busqueda: string;

  userTecnico: string;
  userCliente: string;
  tecnic: Tecnico;

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

  idCategoria: number;

  constructor(private tecnicoService: TecnicoService, private router: Router, private storage: Storage,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.idCategoria = parseInt(this.route.snapshot.paramMap.get('id'));
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
            this.obtenerTecnico(this.idCategoria);
          } 
        });
      }
    });
  }

  obtenerTecnico(id: number) {
    this.tecnicoService.GetTecnicoByCategoria(id).subscribe(data => {
      this.tecnicos = data;
    });
  }

  buscar(event) {
    this.busqueda = event.detail.value;
  }

  detalleTecnico(id) {
    this.router.navigate([`../search-proyect/technicianDetail/${id}`]);
}
}
