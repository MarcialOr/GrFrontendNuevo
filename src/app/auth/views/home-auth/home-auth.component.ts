import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-auth',
  templateUrl: './home-auth.component.html',
  styleUrls: ['./home-auth.component.scss'],
})
export class HomeAuthComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  goLogin() {
    this.router.navigate(['../auth/login']);
  }

  goRegisterOptionsScreen() {
    this.router.navigate(['../auth/accountType']);
  }
}
