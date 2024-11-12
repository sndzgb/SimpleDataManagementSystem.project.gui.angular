import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from 'src/app/services/accounts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from 'src/app/constants/toast-type';
import { FormComponent } from '../../base/form/form.component';
import { Login } from 'src/app/models/read/login.model';
import { WebApiHttpError } from 'src/app/errors/web-api-http-error.error';
import { QueryParams } from 'src/app/constants/query-params';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends FormComponent<LoginComponent> implements OnInit, OnDestroy {


  constructor(
    public accountService: AccountsService, 
    private router: Router, 
    private authService: AuthService,
    private toastService: ToastService
  ) {    
      super();
      if (this.authService.isAuthenticated()) {
        this.toastService.show("You are already authenticated.", ToastType.default); // TODO put string in UiMessages class
        this.router.navigate(['/']);
        return;
      }
  }

  
  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  override ngOnInit(): void {

    super.ngOnInit();

    this.pageTitleService.loginTitle;

    this.formGroup.addControl("username", new FormControl(null, [ Validators.required ]));
    this.formGroup.addControl("password", new FormControl(null, [ Validators.required ]));
  }
  
  onLoginFormSubmitted(): void {

    this.errors = [];
    this.accountService.login(      
      new Login(
        this.formGroup.value
      )
    )
    .subscribe(
      {
        complete: () => {
        },
        error: (error: WebApiHttpError) => {
          this.errors?.push(error);
          this.formValid = false;
        },
        next: (data) => {
          this.authService.setAuthentication(data.jwt!);

          // TODO compare url with returnUrl
          console.log("WINDOW:LOCATION:HREF");
          console.log(window.location.href);

          let returnUrl = this.getQueryParamValueByKey(QueryParams.returnUrl);

          this.router.navigateByUrl(returnUrl || "/");
        }
      }
    );
  }

}