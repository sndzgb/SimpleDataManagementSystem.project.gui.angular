import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditCategory } from 'src/app/models/write/edit-category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/read/category.model';
import { FormComponent } from '../../base/form/form.component';
import { WebApiHttpError } from 'src/app/errors/web-api-http-error.error';

@Component({
  selector: 'edit-category',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditCategoryComponent extends FormComponent<EditCategory> implements OnInit, OnDestroy {

  categoryId: number | null = null;
  category: Category | undefined;
  

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


    this.pathParmsChanged.subscribe(() => { 
      const rId = this.getPathParamValueByKey("categoryId")?.toString();
      if (!rId) {
        this.categoryId = null;
      } else {
        this.categoryId = +rId;
      }
    });


    this.formGroup.addControl("name", new FormControl(null, 
      [ Validators.required, Validators.maxLength(4000) ]
    ));
    this.formGroup.addControl("priority", new FormControl(null, 
      [ Validators.required ]
    ));


    this.categoriesService.getCategoryById(this.categoryId!).subscribe(
      {
        complete: () => {
        },
        error: (error: WebApiHttpError) => {
          this.errors?.push(error);
        },
        next: (data) => {
          this.category = data;
          this.formGroup.patchValue({
            name: this.category.name,
            priority: this.category.priority
          });

          this.pageTitleService.editCategoryTitle = null;
        }
      }
    );
  }

  onEditCategoryFormSubmitted() {

    this.categoriesService.editCategory(this.categoryId!, //this.editCategory!
      new EditCategory(
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
