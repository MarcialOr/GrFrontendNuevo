import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuardService]
  },
  { path: 'usu', loadChildren: './features/usuarios/usuarios.module#UsuariosPageModule' },
   {
    path: 'usuarios',
    loadChildren: () => import ('./usuarios/usuarios.module').then(m => m.UsuariosPageModule) },
  // { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule'},
  { path: 'setting', loadChildren: './setting/setting.module#SettingPageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'search-proyect', loadChildren: './search-proyect/search-proyect.module#SearchProyectPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'notification', loadChildren: './notification/notification.module#NotificationPageModule' },
  { path: 'projects', loadChildren: './projects/projects.module#ProjectsPageModule' },
  // { path: 'categories', loadChildren: './modals/categories/categories.module#CategoriesPageModule' },
  // { path: 'subscription', loadChildren: './modals/subscription/subscription.module#SubscriptionPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
