import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/Models/Usuario';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {
  usuarios: any = [];
  subscription: any = [];

  constructor(private router: Router,
              private modalCTrl: ModalController,
              public storage: Storage,
              public usuarioService: UsuarioService) { }

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
    this.modalCTrl.dismiss();
    this.router.navigate(['jobWorker']);
  }
}
