import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { Categories } from 'src/app/models/read/categories.model';
import { AuthService } from 'src/app/services/auth.service';
import { RoutableComponent } from '../../base/routable/routable.component';
import { WebApiHttpError } from 'src/app/errors/web-api-http-error.error';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent extends RoutableComponent implements OnInit {
  
  take: string = "8";
  page: string = "1";
  categories: Categories | undefined;

  constructor(
    private categoriesService: CategoriesService,
    public authService: AuthService
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.pageTitleService.categoriesTitle;

    this.queryParamsChanged.subscribe(() => {
      this.take = this.getQueryParamValueByKey("take") ?? this.take;
      this.page = this.getQueryParamValueByKey("page") ?? this.page;

      this.categoriesService.getAll(+this.take, +this.page).subscribe(
        {
          complete: () => { 
          },
          error: (error: WebApiHttpError) => { 
            this.errors?.push(error);
          },
          next: (data) => {
            this.categories = data;
          }
        }
      );
    });

  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
