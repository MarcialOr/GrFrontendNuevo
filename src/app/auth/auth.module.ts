import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AuthPage } from './auth.page';
import { HomeAuthComponent } from './views/home-auth/home-auth.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AccountRegisterComponent } from './views/account-register/account-register.component';
import { JobCustomerComponent } from './views/job-customer/job-customer.component';
import { JobWorkerComponent } from './views/job-worker/job-worker.component';
import { AccountTypeComponent } from './views/account-type/account-type.component';
import { CategoryComponent } from './views/category/category.component';
import { SubscriptionComponent } from './views/subscription/subscription.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
    children: [
      {
        path: '',
        component: HomeAuthComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'accountType',
        component: AccountTypeComponent
      },
      {
        path: 'accountRegister',
        component: AccountRegisterComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'jobCustomer',
        component: JobCustomerComponent
      },
      {
        path: 'jobWorker/:name',
        component: JobWorkerComponent
      },
      {
        path: 'category',
        component: CategoryComponent
      },
      {
        path: 'subscription',
        component: SubscriptionComponent
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AuthPage,
    HomeAuthComponent,
    LoginComponent,
    RegisterComponent,
    AccountRegisterComponent,
    JobCustomerComponent,
    JobWorkerComponent,
    AccountTypeComponent,
    CategoryComponent,
    SubscriptionComponent,

  ]
})
export class AuthPageModule {}
