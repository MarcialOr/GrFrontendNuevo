import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/Models/Categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Tecnico } from 'src/Models/Tecnico';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

  categorias: Categoria[];
  categoriaById: number;

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

  constructor(private categoriaService: CategoriaService, public router: Router,
              private storage: Storage) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.obtenerCategoria();
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

  obtenerCategoria() {
    this.categoriaService.obtenerCategorias() .subscribe(data => {
      this.categorias = data;
      console.log(this.categorias);
    });
  }

  obtenerCategoriaById( idcategoria: number) {
    this.categoriaService.GetCategoriaById(idcategoria).subscribe( (data: Categoria) => {
      this.categoriaById = idcategoria;
      console.log(this.categoriaById);
    });
  }

  buscar(event) {
    this.busqueda = event.detail.value;
  }

  detalleCategoria(id) {
    this.router.navigate([`../search-proyect/technician/${id}`]);
}
}
