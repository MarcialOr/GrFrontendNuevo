import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchProyectPage } from './search-proyect.page';
import { CategoriesComponent } from './views/categories/categories.component';
import { TechniciansComponent } from './views/technicians/technicians.component';
import { TechnicianDetailComponent } from './views/technician-detail/technician-detail.component';
import { TechnicianContactComponent } from './views/technician-contact/technician-contact.component';
import { TechnicianContractComponent } from './views/technician-contract/technician-contract.component';
import { PipesModule } from '../pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: SearchProyectPage,
    children: [
      {
        path: '',
        component: CategoriesComponent
      },
      {
        path: 'technician/:id',
        component: TechniciansComponent
      },
      {
        path: 'technicianDetail/:id',
        component: TechnicianDetailComponent
      },
      {
        path: 'technicianContact/:id',
        component: TechnicianContactComponent
      },
      {
        path: 'technicianContract/:id',
        component: TechnicianContractComponent
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    SearchProyectPage,
    CategoriesComponent,
    TechniciansComponent,
    TechnicianDetailComponent,
    TechnicianContactComponent,
    TechnicianContractComponent
  ]
})
export class SearchProyectPageModule {}
