import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/Models/Usuario';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent implements OnInit {
  usuarios: any = [];
  subscription: any = [];
  public nameParam: string;

  constructor(private router: Router,
              private modalCTrl: ModalController,
              public storage: Storage,
              public route: ActivatedRoute,
              public usuarioService: UsuarioService) {
                this.nameParam = this.route.snapshot.queryParams['name'];
              }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getSubscrition();
  }

  getSubscrition() {
    this.usuarioService.obtenerUsuario().subscribe((usuario: Usuario) => {
      this.usuarios = usuario;
    });
  }


  closeModal() {
    this.modalCTrl.dismiss();
  }

  setSubscription(index) {
    this.storage.set('subscription', this.usuarios[index]);
    // this.modalCTrl.dismiss();
    this.router.navigate(['../../auth/jobWorker', this.nameParam]);
  }
}
