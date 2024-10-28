import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, MaxLengthValidator } from '@angular/forms';
import { CreateRetailer } from 'src/app/models/write/create-retailer.model';
import { RetailersService } from 'src/app/services/retailers.service';
import { WebApiHttpError } from 'src/app/errors/web-api-http-error.error';
import { Primitives } from 'src/app/constants/primitives';
import { FormComponent } from '../../base/form/form.component';

@Component({
  selector: 'create-retailer',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateRetailerComponent extends FormComponent<CreateRetailer> implements OnInit, OnDestroy { //BaseComponent


  constructor(
    private router: Router, 
    private retailersService: RetailersService
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.pageTitleService.createRetailerTitle = null;
    
    this.formGroup.addControl("name", new FormControl(null, 
      [ Validators.required, Validators.maxLength(255), Validators.minLength(4) ]
    ));
    this.formGroup.addControl("priority", new FormControl(null, 
      [ Validators.required, Validators.min(Primitives.Int32MinValue), Validators.max(Primitives.Int32MaxValue) ]
    ));


  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onCreateRetailerFormSubmitted(): void {

    this.errors = [];

    this.retailersService.createRetailer(
      new CreateRetailer(
        this.formGroup.value
      )
    ).subscribe(
      {
        complete: () => {
        },
        error: (error: WebApiHttpError) => {
          this.formValid = false;
          this.errors?.push(error);
        },
        next: () => {
          this.router.navigate(['/retailers']);
        }
      }
    );


  }

}
