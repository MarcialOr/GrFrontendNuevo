import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NotificationPage } from './notification.page';
import { RequestComponent } from './views/request/request.component';
import { PipesModule } from '../pipes/pipes.module';
import { ChatComponent } from './views/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationPage,
    children: [
      {
        path: '',
        component: RequestComponent
      },
      {
        path: 'chat/:id',
        component: ChatComponent
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
  declarations: [NotificationPage,
    RequestComponent,
    ChatComponent
  ]
})
export class NotificationPageModule {}
