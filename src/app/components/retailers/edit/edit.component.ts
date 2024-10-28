import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Retailer } from 'src/app/models/read/retailer.model';
import { EditRetailer } from 'src/app/models/write/edit-retailer.model';
import { RetailersService } from 'src/app/services/retailers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Primitives } from 'src/app/constants/primitives';
import { WebApiHttpError } from 'src/app/errors/web-api-http-error.error';
import { FormComponent } from '../../base/form/form.component';

@Component({
  selector: 'edit-retailer',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditRetailerComponent extends FormComponent<EditRetailer> implements OnInit, OnDestroy {

  retailerId: number | null = null;
  retailer: Retailer | null = null;

  constructor(
    private retailersService: RetailersService,
    private router: Router
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


    this.formGroup.addControl("name", new FormControl(null, 
      [ Validators.required, Validators.maxLength(255), Validators.minLength(4) ]
    ));
    this.formGroup.addControl("priority", new FormControl(null, 
      [ Validators.required, Validators.min(Primitives.Int32MinValue), Validators.max(Primitives.Int32MaxValue) ]
    ));



    this.retailersService.getRetailer(this.retailerId!).subscribe(
      {
        complete: () => {
        },
        error: (error: WebApiHttpError) => {
          this.errors?.push(error);
        },
        next: (data) => {
          this.retailer = data;
          this.formGroup.patchValue({
            name: this.retailer.name,
            priority: this.retailer.priority
          });

          this.pageTitleService.editRetailerTitle = this.retailer.name!;
        }
      }
    );
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onEditRetailerFormSubmitted() {
    this.errors = [];

    this.retailersService.editRetailer(this.retailerId!, 
      new EditRetailer(
        this.formGroup.value
      )
    )
    .subscribe(
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
    )
  }


  onRemoveRetailerImageClicked(retailer: Retailer) {
    this.retailersService.updateRetailerPartial(retailer?.id!).subscribe(
      {
        complete: () => {
        },
        error: (error: WebApiHttpError) => {
          // console.log(error);
          this.errors?.push(error);
        },
        next: () => {
          this.retailer!.logoImageUri = null;
        }
      }
    );
  }
      
}
