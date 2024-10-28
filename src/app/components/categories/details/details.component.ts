import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoutableComponent } from '../../base/routable/routable.component';
import { Category } from 'src/app/models/read/categories.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { WebApiHttpError } from 'src/app/errors/web-api-http-error.error';

@Component({
  selector: 'category-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class CategoryDetailsComponent extends RoutableComponent implements OnInit, OnDestroy {

  categoryId: number | null = null;
  category: Category | undefined;
  
  constructor(
    public authService: AuthService, 
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
          this.pageTitleService.categoryDetailsTitle = this.category?.name!;
        }
      }
    );
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
