import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-type',
  templateUrl: './account-type.component.html',
  styleUrls: ['./account-type.component.scss'],
})
export class AccountTypeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  goWorker() {
    this.router.navigate(['../../auth/accountRegister']);
  }

  goCostumer() {
    this.router.navigate(['../../auth/jobCustomer']);
  }
}
