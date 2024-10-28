import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Retailer } from 'src/app/models/read/retailer.model';
import { RetailersService } from 'src/app/services/retailers.service';
import { FormComponent } from '../../base/form/form.component';
import { WebApiHttpError } from 'src/app/errors/web-api-http-error.error';

@Component({
  selector: 'delete-retailer',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteRetailerComponent extends FormComponent<Retailer> implements OnInit, OnDestroy {
  
  retailer: Retailer | null = null;
  retailerId: number | null = null;

  constructor(
    private router: Router, 
    private retailersService: RetailersService
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
          this.pageTitleService.deleteRetailerTitle = this.retailer.name!;
        }
      }
    );
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onDeleteRetailerClicked() {
    this.retailersService.deleteRetailer(this.retailerId!).subscribe(
      {
        complete: () => {
        },
        error: (error: WebApiHttpError) => {
          this.errors?.push(error);
        },
        next: () => {
          this.router.navigate(['/retailers']);
        }
      }
    );
  }

}
