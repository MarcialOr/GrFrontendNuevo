import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { CategoriesPage } from 'src/app/modals/categories/categories.page';
import { Categoria } from 'src/Models/Categoria';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/Models/Usuario';

import { Tecnico } from 'src/Models/Tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-account-register',
  templateUrl: './account-register.component.html',
  styleUrls: ['./account-register.component.scss']
})
export class AccountRegisterComponent implements OnInit {
  formGroupRegister: FormGroup;
  tecnicoid: number;
  nombre: string;
  correo: string;
  clave: string;
  direccion: string;
  sobreMi: string;
  rankingid: number;
  presupueto: number;
  categoriaid: number;
  usuarioid: number;
  fechaInicio: string;
  //2019-23-2
  fechaFinal: string;

  usuario: Usuario;
  tecnico: Tecnico;
  categoria: Categoria[];
  idCategory: number;
  category = 'Eliga su categoria';
  data: any = [];

  passwordTypeInput = 'password';
  iconpassword = 'eye-off';

  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private modalCTrl: ModalController,
    private router: Router,
    public storage: Storage,
    // tslint:disable-next-line: variable-name
    private _tecnicoService: TecnicoService
  ) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
        this.idCategory = this.data.id;
        this.category = this.data.Name;
      } else {
        this.idCategory = null;
        this.category = 'Eliga su categoria';
      }
    });
  }

  ngOnInit() {}

  togglePasswordMode() {
    this.passwordTypeInput  =  this.passwordTypeInput  ===  'text'  ?  'password'  :  'text';
    this.iconpassword  =  this.iconpassword  ===  'eye-off'  ?  'eye'  :  'eye-off';
  }

  crearTecnico() {
    this.tecnico = new Tecnico();
    this.tecnico.nombre = this.nombre;
    this.tecnico.correo = this.correo;
    this.tecnico.clave = this.clave;
    this.tecnico.direccion = this.direccion;
    // tslint:disable-next-line: radix
    this.tecnico.sobreMi = '';
    // tslint:disable-next-line: radix
    this.tecnico.rankingid = 1;
    this.tecnico.presupuesto = 0;
    this.tecnico.categoriaid = 11;
    this.tecnico.usuarioid = 1;
    // this.tecnico.categoriaid = this.categoriaid;
    this.tecnico.fechaInicio = '2019-11-24';
    this.tecnico.fechaFinal = '2100-11-24';

    if (this.tecnico) {
      this._tecnicoService.crearTecnico(this.tecnico).subscribe((test: Tecnico) => {
        console.log(this.tecnico.tecnicoid);
        this._tecnicoService.tecnicoTemp = test;
        this.storage.set('user', test);
        console.log(test);
        this.router.navigate(['../../auth/jobWorker', test.nombre]);
      }
      // , (error) => {
      //   console.log(error);
      //   console.log(this.tecnico);
      // }
      );
    }
  }

  async getCategory() {
    const modal = await this.modalCTrl.create({
      component: CategoriesPage
    });
    modal.present();
  }
}
