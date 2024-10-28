import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from 'src/app/services/accounts.service';
import { UpdatePassword } from 'src/app/models/write/update-password.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormComponent } from '../../base/form/form.component';
import { WebApiHttpError } from 'src/app/errors/web-api-http-error.error';

@Component({
  selector: 'password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent extends FormComponent<UpdatePassword> implements OnInit, OnDestroy {

  constructor(private accountsService: AccountsService, private authService: AuthService,
    private router: Router
  ) {
    super();
  }

  override ngOnInit(): void {

    super.ngOnInit();

    this.pageTitleService.passwordChangeTitle;

    this.formGroup.addControl("oldpassword", new FormControl(null, [ Validators.required ]));
    this.formGroup.addControl("newpassword", new FormControl(null, [ Validators.required ]));


  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
  
  onPasswordChangeFormSubmitted() {

    this.errors = [];

    this.accountsService.updatePassword(
      new UpdatePassword(this.formGroup.value)
    )
    .subscribe(
      {
        complete: () => { 
        },
        error: (error: WebApiHttpError) => { 
          this.errors?.push(error);
          this.formValid = false;
        },
        next: () => {
          this.authService.clearAuthentication();
          this.router.navigate(['/account/login'])
        }
      }
    );


  }
  
}
