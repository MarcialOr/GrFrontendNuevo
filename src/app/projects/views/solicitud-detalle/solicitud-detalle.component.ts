import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoricotrabajoService } from 'src/app/services/historicotrabajo.service';
import { Storage } from '@ionic/storage';
import { Historicotrabajo } from 'src/Models/Historicotrabajo';

@Component({
  selector: 'app-solicitud-detalle',
  templateUrl: './solicitud-detalle.component.html',
  styleUrls: ['./solicitud-detalle.component.scss']
})
export class SolicitudDetalleComponent implements OnInit {
  historicoid: number;
  historico: Historicotrabajo;
  descripcionUpdate: string;
  estado: string;
  precio: string;
  userTecnico: string;
  userCliente: string;
  estatus: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private historicoService: HistoricotrabajoService,
    private storage: Storage
  ) {
    // tslint:disable-next-line: radix
    this.historicoid = parseInt(this.route.snapshot.params.id);
  }

  ngOnInit() {}

  ionViewWillEnter() {
    //paso 3 pasar el html
    this.verifyUser();
    this.getHistoricoTrabajoById();
  }

  verifyUser() {
    this.storage.get('userTecnico').then(usuario => {
      // asi obtenego el aid del cliente ejemplo
      // const test = this.tecnic.tecnicoid;
      if (usuario) {
        console.log('entre tecnico');
        this.userTecnico = 'found';
      } else {
        this.storage.get('userCliente').then(usuarioC => {
          if (usuarioC) {
            console.log('entre cliente');
            this.userCliente = 'found';
          }
        });
      }
    });
  }

  getHistoricoTrabajoById() {
    this.historicoService
      .GetHistoricotrabajoById(this.historicoid)
      .subscribe(data => {
        this.historico = data;
        this.estatus = this.historico.estado;
        console.log(this.historico);
      });
  }

  UpdateProject() {
    if (this.historico.estado == 5) {
      this.router.navigate(['../projects/rating']);
    } else {
      this.historico.precio = parseFloat(this.precio);
      this.historico.estado = 1;
      this.historicoService
        .editHistoricotrabajo(this.historico)
        .subscribe(data => {
          this.getHistoricoTrabajoById();
        });
    }
  }

  AceptedProject() {
      this.historico.estado = 2;
      this.historicoService
        .editHistoricotrabajo(this.historico)
        .subscribe(data => {
          this.getHistoricoTrabajoById();
        });
  }

  deniedProject() {
    if (this.historico.estado <= 2) {
      console.log('No se puede denegar porque ya se acepto el proyecto');
    } else {
      this.historico.estado = 3;
      this.historicoService
        .editHistoricotrabajo(this.historico)
        .subscribe(data => {
          this.getHistoricoTrabajoById();
        });
    }
  }

  verifyStatus() {
    if (this.estatus == 2) {
    }
  }
}
