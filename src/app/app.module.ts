import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesPageModule } from './modals/categories/categories.module';
import { CategoriesPage } from './modals/categories/categories.page';
import { SubscriptionPage } from './modals/subscription/subscription.page';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [AppComponent, CategoriesPage, SubscriptionPage],
  entryComponents: [CategoriesPage, SubscriptionPage],
  imports: [
    BrowserModule,
    // CategoriesPageModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: 'SomeoneKnowsOf',
      driverOrder: ['indexddb', 'sqlite', 'websql']
    }),
    HttpClientModule,
    AppRoutingModule,
    PipesModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
