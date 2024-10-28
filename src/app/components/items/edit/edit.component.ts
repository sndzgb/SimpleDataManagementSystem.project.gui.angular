import { AfterContentInit, AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule, FormArray, FormBuilder, FormControl, FormControlStatus, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categories } from 'src/app/models/read/categories.model';
import { Item } from 'src/app/models/read/item.model';
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
  item: Item | undefined;

  constructor(
    private router: Router, 
    private itemsService: ItemsService, 
    private retailersService: RetailersService,
    private categoriesService: CategoriesService
  ) {    
      super();
  }


  onRemoveProductImageClicked(item: Item) {
    let uri = encodeURIComponent(this.item?.nazivproizvoda!);
    this.itemsService.updateItemPartial(uri).subscribe(
      {
        complete: () => {
        },
        error: (error: WebApiHttpError) => {
          this.formValid = false;
          this.errors?.push(error);
        },
        next: () => {
          this.item!.URLdoslikeUri = null;
        }
      }
    );
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
            cijena: this.item.cijena,
            opis: this.item.opis,
            datumakcije: this.item.datumakcije,
            retailerId: this.item.retailerId,
            kategorija: this.item.kategorija,
          });

          this.pageTitleService.editItemTitle = this.item?.nazivproizvoda!;
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
