import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthSpringService {
  token: string;

  constructor(private router: Router, private httpClient: HttpClient) {}

  signupUser(email: string, password: string) {
    this.httpClient.post('http://localhost:8080/api/auth/signup',
      {'usernameOrEmail': email, 'password': password } )
      .subscribe( (value =>  console.log(value) ) ) ;
  }

  signinUser(email: string, password: string) {
    this.httpClient.post('http://localhost:8080/api/auth/signin', {'usernameOrEmail': email, 'password': password })
      .subscribe( (value =>  console.log(value) ) ) ;
  }

  logout() {
    this.token = null;
  }

  getToken() {
    return null;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
