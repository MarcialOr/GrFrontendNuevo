import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { ToastController, ModalController } from '@ionic/angular';
import { Tecnico } from 'src/Models/Tecnico';
import { Usuario } from 'src/Models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/Models/Categoria';
import { CategoriesPage } from 'src/app/modals/categories/categories.page';
import { SubscriptionPage } from 'src/app/modals/subscription/subscription.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-job-worker',
  templateUrl: './job-worker.component.html',
  styleUrls: ['./job-worker.component.scss']
})
export class JobWorkerComponent implements OnInit {
  formGroupRegister: FormGroup;
  public nameParam: string;
  presupuesto: string;
  categoria: string;
  user: string;

  usuario: Usuario[];
  tecnico: Tecnico;
  tecnicoUpdate: Tecnico; 
  catego: string;
  idCategory: number;
  category = 'Eliga su categoria';
  dataC: any = [];

  idUsuario: number;
  subscrition = 'Eliga su Subscripcion';
  dataT: any = [];

  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public storage: Storage,
    public modalCTrl: ModalController,
    private tecnicoService: TecnicoService,
    public toastController: ToastController,
    private usuarioService: UsuarioService,
    private categoriaService: CategoriaService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    // tslint:disable-next-line: radix
    this.nameParam = this.route.snapshot.paramMap.get('name');
    this.getTecnico(this.nameParam);
    this.tecnico = new Tecnico();
  }

  getTecnico(name: string){
    this.tecnicoService.GetTecnicoByName(name).subscribe(data => {
      this.tecnico = data;
      console.log(this.tecnico);
    });
  }

  /*  getUserId(name: string) {
    this.usuarioService.GetUsuarioByName(name).subscribe(res => {
      this.usuario = res;
      console.log(this.usuario);
    });
  }
*/

ionViewWillEnter() {

  this.storage.get('category').then((category) => {
    if (category) {
      this.idCategory = category.categoriaid;
      this.category = category.nombre;
    } else {
      this.idCategory = null;
      this.category = 'Eliga su categoria';
    }
  });
  this.storage.get('subscription').then((subs) => {
    if (subs) {
      this.idUsuario = subs.usuarioid;
      this.subscrition = subs.suscripcion;
    } else {
      this.idUsuario = null;
      this.subscrition = 'Eliga su Subscripcion';
    }
  });
}

  async getCategory() {
    const modal = await this.modalCTrl.create({
      component: CategoriesPage
    });
    modal.present();
  }

  async getSubscription() {
    const modal = await this.modalCTrl.create({
      component: SubscriptionPage
    });
    modal.present();
  }

  crearProveedor() {
    // tslint:disable-next-line: radix
    console.log(this.tecnicoService.tecnicoTemp);
    if (this.idUsuario === null || this.idCategory === null) {
      this.presentToast('Hay campos incompletos.');
    } else {
      this.tecnicoService.tecnicoTemp.presupuesto = parseInt(this.presupuesto);
      this.tecnicoService.tecnicoTemp.usuarioid = this.idUsuario;
      this.tecnicoService.tecnicoTemp.categoriaid = this.idCategory;
      this.tecnicoService.editTecnico(this.tecnicoService.tecnicoTemp).subscribe((tecnic: Tecnico) => {
        this.storage.set('userTecnico', this.tecnicoService.tecnicoTemp);
        this.router.navigate(['../../home']);
        this.storage.remove('subscription');
        this.storage.remove('category');
      }, (error) => {
        console.log(error);
      });
    }
  }

  async presentToast(msj) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000
    });
    toast.present();
  }
}
