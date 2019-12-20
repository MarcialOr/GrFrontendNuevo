import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Tecnico } from 'src/Models/Tecnico';
import { Cliente } from 'src/Models/Cliente';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroupRegister: FormGroup;
  type: string;
  correo: string;
  clave: string;
  usuarioInfo: any = [];
  typeLogin = 'contratist';

  tecnico: Tecnico;
  cliente: Cliente;

  passwordTypeInput  =  'password';
  iconpassword  =  'eye-off';

  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    public toastController: ToastController
    ) {
      this.type = this.route.snapshot.params.type;
   }

  ngOnInit() {}

  togglePasswordMode() {
    this.passwordTypeInput  =  this.passwordTypeInput  ===  'text'  ?  'password'  :  'text';
    this.iconpassword  =  this.iconpassword  ===  'eye-off'  ?  'eye'  :  'eye-off';
  }

  irRegister() {
    this.router.navigate(['accountRegister']);
  }

  setTypeLogin(type) {
    this.typeLogin = type;
  }

  login() {
    if (this.typeLogin === 'worker') {
      this.tecnicoService.GetTecnicoByUserName(this.correo, this.clave).subscribe((tecnico: Tecnico) => {
           this.tecnico = tecnico;
           console.log(tecnico);
           if (tecnico === null) {
            this.toastPresent('Datos incorrectos');
          } else {
            this.storage.set('userTecnico', tecnico);
            this.router.navigate(['home']);
          }
      });
    } else if (this.typeLogin === 'contratist') {
      this.clienteService.GetClienteByUserName(this.correo, this.clave).subscribe((cliente: Cliente) => {
        this.cliente = cliente;
        console.log(cliente);
        if (cliente === null) {
          this.toastPresent('Datos incorrectos');
        } else {
          this.storage.set('userCliente', cliente);
          this.router.navigate(['home']);
        }
    });
  }
    // this.router.navigate(['search-proyect']);
  //   this.usuarioService.GetUsuarioByUserName(this.correo, this.clave).subscribe(async (usuario: any)=>{
  //     this.usuarioInfo = usuario;
  //     if (this.usuarioInfo) {
  //       if (this.usuarioInfo.tipo === 1) {
  //         this.router.navigate(['home']);
  //       } else {
  //         this.router.navigate(['dashboard']);
  //       }
  //       this.storage.set('user', usuario);
  //     } else {
  //       const toast = await this.toastController.create({
  //         message: 'Contraseña o Usuario incorrecto. O no existe.',
  //         duration: 2000
  //       });
  //       toast.present();
  //     }
  //   }, async (error) => {
  //     const toast = await this.toastController.create({
  //       message: 'Your settings have been saved.',
  //       duration: 2000
  //     });
  //     toast.present();
  //   });
  }

  async toastPresent(msj) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000
      });
    toast.present();
  }
}
