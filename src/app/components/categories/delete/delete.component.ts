import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryDetails } from 'src/app/models/read/category-details.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { FormComponent } from '../../base/form/form.component';
import { WebApiHttpError } from 'src/app/errors/web-api-http-error.error';

@Component({
  selector: 'delete-category',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteCategoryComponent extends FormComponent<CategoryDetails> implements OnInit, OnDestroy {
  
  categoryId: number | null = null;
  category: CategoryDetails | null = null;

  constructor(
    private router: Router, 
    private categoriesService: CategoriesService
  ) {
    super();
  }
  
  override ngOnInit(): void {
    super.ngOnInit();

    this.pathParmsChanged.subscribe(() => { 
      const cId = this.getPathParamValueByKey("categoryId")?.toString();
      if (!cId) {
        this.categoryId = null;
      } else {
        this.categoryId = +cId;
      }
    });

    this.categoriesService.getCategoryById(this.categoryId!).subscribe(
      {
        complete: () => {
        },
        error: (error: WebApiHttpError) => {
          this.errors?.push(error);
        },
        next: (data) => {
          this.category = data;
          this.pageTitleService.deleteCategoryTitle = this.category.name!;
        }
      }
    );
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onDeleteCategoryClicked() {
    this.categoriesService.deleteCategory(this.categoryId!).subscribe(
      {
        complete: () => {
        },
        error: (error: WebApiHttpError) => {
          this.errors?.push(error);
        },
        next: () => {
          this.router.navigate(['/categories'])
        }
      }
    );
  }

}
