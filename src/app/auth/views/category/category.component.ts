import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/Models/Categoria';
import {  Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categories: any = [];
  public nameParam: string;

  constructor(public storage: Storage,
              public route: ActivatedRoute,
              private categoriaService: CategoriaService,
              public router: Router) {
                this.nameParam = this.route.snapshot.queryParams['name'];
              }

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

  // closeModal() {
  //   this.modalCTrl.dismiss();
  // }

  setCategory(index) {
    this.storage.set('category', this.categories[index]);
    // const params = {
    //   id: index,
    //   Name: name
    // };
    // this.modalCTrl.dismiss();
    // const navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     special: JSON.stringify(params)
    //   }
    // };
    this.router.navigate(['../../auth/jobWorker', this.nameParam]);
  }
}
