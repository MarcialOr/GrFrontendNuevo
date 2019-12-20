import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProjectsPage } from './projects.page';
import { PipesModule } from '../pipes/pipes.module';
import { ShowProjectsComponent } from './views/show-projects/show-projects.component';
import { SolicitudDetalleComponent } from './views/solicitud-detalle/solicitud-detalle.component';
import { RatingComponent } from './views/rating/rating.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsPage,
    children: [
      {
        path: '',
        component: ShowProjectsComponent
      },
      {
        path: 'solicitudDetalle/:id',
        component: SolicitudDetalleComponent
      },
      {
        path: 'rating',
        component: RatingComponent
      }
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
    ShowProjectsComponent,
    SolicitudDetalleComponent,
    RatingComponent,
    ProjectsPage]
})
export class ProjectsPageModule {}
