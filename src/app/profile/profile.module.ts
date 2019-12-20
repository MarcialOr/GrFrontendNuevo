import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import { HomeProfileComponent } from './views/home-profile/home-profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    children: [
      {
        path: '',
        component: HomeProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomeProfileComponent,
    ProfilePage,
  ]
})
export class ProfilePageModule {}
