import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {

  constructor( private router: Router, private AuthService: AuthService) { }

  ngOnInit() {
    console.log('======================> UsersComponent <======================')

    const authToken = localStorage.getItem('token');
    console.log('authToken =>', authToken)
    if (authToken ) {
      this.AuthService.user.next(true)
      this.AuthService.isLogin.next(true)

      this.router.navigate(['/backend/dashboard'])
    }
  }

}
