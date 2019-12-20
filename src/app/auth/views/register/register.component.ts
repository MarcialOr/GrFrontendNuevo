import { Component, OnInit } from '@angular/core';
import { UsuarioService} from '../../../services/usuario.service';
import { Usuario } from 'src/Models/Usuario';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  usuario: Usuario;

  constructor(private _usuarioService: UsuarioService,
              public menuCtrl: MenuController,
              public router: Router ) {
      // tslint:disable-next-line: no-unused-expression
      this.usuario; new Usuario();
      this.menuCtrl.enable(false);
     }

  ngOnInit() {
  }


}
