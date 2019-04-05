import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { UserToken } from '../../model/user-token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[ i ].markAsDirty();
      this.loginForm.controls[ i ].updateValueAndValidity();
    }
    console.log(this.loginForm.get('userName').value);

    this.loginService
      .doLogin(this.loginForm.get('userName').value, this.loginForm.get('password').value)

      .subscribe((model: UserToken) => {
        console.log(model);
        sessionStorage.setItem('token', model.token);
        sessionStorage.setItem('imageUrl', model.imageUrl);
        sessionStorage.setItem('menuGroupList', JSON.stringify(model.menuGroupList));
        sessionStorage.setItem('authorityList', JSON.stringify(model.authorities));

        this.router.navigate(['/home']);
      });

  }

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      remember: [ true ]
    });
  }
}
