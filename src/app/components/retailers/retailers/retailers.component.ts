import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Retailers } from 'src/app/models/read/retailers.model';
import { RetailersService } from 'src/app/services/retailers.service';
import { AuthService } from 'src/app/services/auth.service';
import { WebApiHttpError } from 'src/app/errors/web-api-http-error.error';
import { RoutableComponent } from '../../base/routable/routable.component';

@Component({
  selector: 'retailers',
  templateUrl: './retailers.component.html',
  styleUrls: ['./retailers.component.css']
})
export class RetailersComponent extends RoutableComponent implements OnInit, OnDestroy {
    
  take: string = "8";
  page: string = "1";
  retailers: Retailers | undefined;

  constructor(
    private retailersService: RetailersService, 
    public authService: AuthService
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.pageTitleService.retailersTitle;

    this.queryParamsChanged.subscribe(() => {
      this.take = this.getQueryParamValueByKey("take") ?? this.take;
      this.page = this.getQueryParamValueByKey("page") ?? this.page;

      this.retailersService.getAllRetailers(+this.take, +this.page).subscribe(
        {
          complete: () => { 
          },
          error: (error: WebApiHttpError) => { 
            this.errors?.push(error);
          },
          next: (data) => {
            this.retailers = data;
          }
        }
      );
    }
    );

  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

    }
