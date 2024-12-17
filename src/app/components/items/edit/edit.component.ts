import { AfterContentInit, AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule, FormArray, FormBuilder, FormControl, FormControlStatus, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categories } from 'src/app/models/read/categories.model';
import { ItemDetails } from 'src/app/models/read/item-details.model';
import { Retailers } from 'src/app/models/read/retailers.model';
import { EditItem } from 'src/app/models/write/edit-item.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { ItemsService } from 'src/app/services/items.service';
import { RetailersService } from 'src/app/services/retailers.service';
import { WebApiHttpError } from 'src/app/errors/web-api-http-error.error';
import { FormComponent } from '../../base/form/form.component';
@Component({
  selector: 'edit-item',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
}) 
export class EditItemComponent extends FormComponent<EditItem> implements OnInit, OnDestroy, AfterViewInit {



  itemId: string | null = null;
  categories: Categories | null = null;
  retailers: Retailers | null = null;
  item: ItemDetails | undefined;

  constructor(
    private router: Router, 
    private itemsService: ItemsService, 
    private retailersService: RetailersService,
    private categoriesService: CategoriesService
  ) {    
      super();
  }


  onRemoveProductImageClicked(item: ItemDetails) {
    this.item!.item!.URLdoslike = null;
    this.formGroup.patchValue({
      deleteCurrentURLdoslike: true
    });

    this.formGroup.markAsDirty();
    this.formGroup.markAsTouched();
    
    // let uri = encodeURIComponent(this.item?.item?.nazivproizvoda!);
    // this.itemsService.updateItemPartial(uri).subscribe(
    //   {
    //     complete: () => {
    //     },
    //     error: (error: WebApiHttpError) => {
    //       this.formValid = false;
    //       this.errors?.push(error);
    //     },
    //     next: () => {
    //       this.item!.item!.URLdoslike = null;
    //     }
    //   }
    // );
  }

  override ngOnInit(): void {

    super.ngOnInit();

    this.pathParmsChanged.subscribe(() => { 
      const rId = this.getPathParamValueByKey("itemId");
      this.itemId = rId;
    });


    this.formGroup.addControl("opis", new FormControl(null, 
      [ Validators.maxLength(4000) ]
    ));
    this.formGroup.addControl("datumakcije", new FormControl(null, 
      [ Validators.maxLength(4000) ]
    ));
    this.formGroup.addControl("retailerId", new FormControl(null, 
      [ Validators.required ]
    ));
    this.formGroup.addControl("cijena", new FormControl(null, 
      [ Validators.required ]
    ));
    this.formGroup.addControl("kategorija", new FormControl(null, 
      [ Validators.required ]
    ));
    this.formGroup.addControl("deleteCurrentURLdoslike", new FormControl(false, 
      null
    ));
    this.formGroup.addControl("isEnabled", new FormControl(null, 
      null
    ));



    let u = encodeURIComponent(this.itemId!);
    this.itemsService.getItem(u).subscribe(
      {
        complete: () => {
        },
        error: (error: WebApiHttpError) => {
          this.errors?.push(error);
        },
        next: (data) => {
          this.item = data;
          this.formGroup.patchValue({
            cijena: this.item.item?.cijena,
            opis: this.item.item?.opis,
            datumakcije: this.item.item?.datumakcije,
            retailerId: this.item.item?.retailer?.id,
            kategorija: this.item.item?.category?.id,
            isEnabled: this.item.item?.isEnabled
          });

          this.pageTitleService.editItemTitle = this.item.item?.nazivproizvoda!;
        }
      }
    );
    
    this.retailersService.getAllRetailers().subscribe(
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

    this.categoriesService.getAll().subscribe(
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

  }


  ngAfterViewInit() {
  }
  
  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
  
  onEditItemFormSubmitted(): void {

    this.itemsService.editItem(this.itemId!, 
      new EditItem(
        this.formGroup.value
      )
    )
    .subscribe(
      {
        complete: () => {
        },
        error: (error: WebApiHttpError) => {
          this.errors?.push(error);
        },
        next: (data) => {
          this.router.navigate(['/items']);
        }
      }
    );
  }

}
