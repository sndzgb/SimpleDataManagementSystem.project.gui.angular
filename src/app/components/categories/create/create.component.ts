import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { CreateCategory } from 'src/app/models/write/create-category.model';
import { Router } from '@angular/router';
import { FormComponent } from '../../base/form/form.component';
import { WebApiHttpError } from 'src/app/errors/web-api-http-error.error';

@Component({
  selector: 'create-category',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateCategoryComponent extends FormComponent<CreateCategory> implements OnInit, OnDestroy {


  constructor(
    private categoriesService: CategoriesService, 
    private router: Router
  ) {
    super();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.pageTitleService.createCategoryTitle = null;

    this.formGroup.addControl("name", new FormControl(null, [ Validators.required ]));
    this.formGroup.addControl("priority", new FormControl(null, [ Validators.required ]));


  }

  onCreateCategoryFormSubmitted() {
    this.errors = [];

    this.categoriesService.createCategory(
      new CreateCategory(
        this.formGroup.value
      )
    ).subscribe(
      {
        complete: () => {
        },
        error: (error: WebApiHttpError) => {
          this.errors?.push(error);
        },
        next: () => {
          this.router.navigate(['/categories']);
        }
      }
    );
  }
    
}
