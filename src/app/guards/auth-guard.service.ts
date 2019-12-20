import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  authentication: boolean;

  constructor(
    private router: Router,
    public storage: Storage,
  ) { }

  async canActivate(route: ActivatedRouteSnapshot) {
    console.log(route);
    return this.storage.get('userTecnico').then((usuario) => {
      if (usuario) {
        return true;
      } else {
        return this.storage.get('userCliente').then((usuarioC) => {
          if (usuarioC) {
            return true;
          } else {
            this.router.navigate(['auth']);
            return false;
          }
        });
      }
    });
  }
}
