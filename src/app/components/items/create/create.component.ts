import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlStatus, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { RetailersService } from 'src/app/services/retailers.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { Categories } from 'src/app/models/read/categories.model';
import { Retailers } from 'src/app/models/read/retailers.model';
import { CreateItem } from 'src/app/models/write/create-item.model';
import { FormComponent } from '../../base/form/form.component';
import { WebApiHttpError } from 'src/app/errors/web-api-http-error.error';

@Component({
  selector: 'create-item',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateItemComponent extends FormComponent<CreateItem> implements OnInit, OnDestroy {

  retailers: Retailers | undefined;
  categories: Categories | undefined;
  constructor(
    private router: Router,
    private itemsService: ItemsService,
    private retailersService: RetailersService,
    private categoriesService: CategoriesService,
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.pageTitleService.createItemTitle;


    this.formGroup.addControl("nazivproizvoda", new FormControl(null, [ Validators.required ]));
    this.formGroup.addControl("opis", new FormControl(null, [ Validators.maxLength(4000) ]));
    this.formGroup.addControl("datumakcije", new FormControl(null, [ Validators.maxLength(4000) ]));
    this.formGroup.addControl("retailerId", new FormControl(null, [ Validators.required ]));
    this.formGroup.addControl("cijena", new FormControl(null, [ Validators.required ]));
    this.formGroup.addControl("kategorija", new FormControl(null, [ Validators.required ]));

    this.retailersService.getAllRetailers().subscribe(
      {
        complete: () => {
        },
        error: (error: WebApiHttpError) => {
          this.formValid = false;
          this.errors?.push(error);
        },
        next: (data) => {
          this.retailers = data;
        }
      }
    );

    this.categoriesService.getAll().subscribe(
      {
        complete: () => {
        },
        error: (error: WebApiHttpError) => {
          this.formValid = false;
          this.errors?.push(error);
        },
        next: (data) => {
          this.categories = data;
        }
      }
    );

  }
  
  override ngOnDestroy(): void {
    super.ngOnDestroy();

  }


  onCreateItemFormSubmitted(): void {

    this.errors = [];

    this.itemsService.createItem(
      new CreateItem(this.formGroup.value)
    )
    .subscribe(
      {
          complete: () => {
        },
        error: (error: WebApiHttpError) => {
          this.errors?.push(error);
        },
        next: () => {
          this.router.navigate(['/items']);
        }
      }
    );

    // TEST
  }
  
  
}
