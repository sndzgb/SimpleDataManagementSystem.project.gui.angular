import { Component, OnDestroy, OnInit } from '@angular/core';
import { RetailersService } from 'src/app/services/retailers.service';
import { RetailerDetails } from 'src/app/models/read/retailer-details.model';
import { AuthService } from 'src/app/services/auth.service';
import { RoutableComponent } from '../../base/routable/routable.component';
import { WebApiHttpError } from 'src/app/errors/web-api-http-error.error';

@Component({
  selector: 'retailer-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class RetailerDetailsComponent extends RoutableComponent implements OnInit, OnDestroy {
  
  retailerId: number | null = null;
  retailer: RetailerDetails | null = null;

  constructor(
    private retailersService: RetailersService, 
    public authService: AuthService
  ) {
    super();
  }
  
  override ngOnInit(): void {
    super.ngOnInit();

    this.pathParmsChanged.subscribe(() => { 
      const rId = this.getPathParamValueByKey("retailerId")?.toString();
      if (!rId) {
        this.retailerId = null;
      } else {
        this.retailerId = +rId;
      }
    });

    
    this.retailersService.getRetailer(this.retailerId!).subscribe(
      {
        complete: () => {
        },
        error: (error: WebApiHttpError) => {
          this.errors?.push(error);
        },
        next: (data) => {
          this.retailer = data;
          this.pageTitleService.retailerDetailsTitle = this.retailer?.name!;
        }
      }
    );
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
