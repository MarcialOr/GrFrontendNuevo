import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Cliente } from 'src/Models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { Usuario } from 'src/Models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-job-customer',
  templateUrl: './job-customer.component.html',
  styleUrls: ['./job-customer.component.scss']
})
export class JobCustomerComponent implements OnInit {
  formGroupRegister: FormGroup;
  name: string;
  clienteid: number;
  nombre: string;
  correo: string;
  clave: string;
  direccion: string;
  sobreMi: string;
  rankingid: number;

  cliente: Cliente;

  passwordTypeInput = 'password';
  iconpassword = 'eye-off';

  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    public toastController: ToastController,
    public storage: Storage
  ) {}

  ngOnInit() {
  }

  togglePasswordMode() {
    // this.passwordTypeInput =
    // tslint:disable-next-line: no-unused-expression
    this.passwordTypeInput === 'text' ? 'password' : 'text';
    this.iconpassword = this.iconpassword === 'eye-off' ? 'eye' : 'eye-off';
  }

  crearCliente() {
    this.cliente = new Cliente();
    this.cliente.nombre = this.nombre;
    this.cliente.correo = this.correo;
    this.cliente.direccion = this.direccion;
    this.cliente.clave = this. clave;
    this.cliente.rankingid = 1;
    this.cliente.sobremi = '';
    if (this.cliente) {
      this.clienteService.crearCliente(this.cliente).subscribe((test: Cliente) => {
        console.log(this.cliente.clienteid);
        this.clienteService.clienteTemp = test;
        this.storage.set('user', test);
        this.router.navigate(['home']);
      });
    }
  }
}
