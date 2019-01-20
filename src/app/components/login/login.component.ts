import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/services';

@Component({
  selector: 'Wetr-login',
  templateUrl: './login.component.html',
  styles: []
})

export class LoginComponent implements OnInit {

  loginParams: any = {
    username: "",
    password: ""
  };
  returnUrl: string;
  errorMessage: string;

  constructor(private auth: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';  
  }

  submitForm() {
    this.auth.login(this.loginParams.username, this.loginParams.password).subscribe(
      res => {
        this.errorMessage = null;
        this.router.navigate([this.returnUrl]);
      },
      err => this.errorMessage = "Username and/or password is wrong!"
    );
  }

}
