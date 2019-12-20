import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/Models/Categoria';
import { NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  categories: any = [];

  constructor(private modalCTrl: ModalController,
              public storage: Storage,
              private categoriaService: CategoriaService,
              public router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getCategories();
  }

  getCategories() {
    this.categoriaService.obtenerCategorias().subscribe((categoria) => {
      this.categories = categoria;
    });
  }

  closeModal() {
    this.modalCTrl.dismiss();
  }

  setCategory(index) {
    this.storage.set('category', this.categories[index]);
    // const params = {
    //   id: index,
    //   Name: name
    // };
    this.modalCTrl.dismiss();
    // const navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     special: JSON.stringify(params)
    //   }
    // };
    this.router.navigate(['jobWorker']);
  }

}
