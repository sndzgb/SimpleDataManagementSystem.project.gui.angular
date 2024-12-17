import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Item, ItemDetails } from 'src/app/models/read/item-details.model';
import { ItemsService } from 'src/app/services/items.service';
import { FormComponent } from '../../base/form/form.component';
import { WebApiHttpError } from 'src/app/errors/web-api-http-error.error';

@Component({
  selector: 'delete-item',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteItemComponent extends FormComponent<Item> implements OnInit, OnDestroy {

  item: ItemDetails | null = null;
  itemId: string | null = null;

  
  get uriEncodedProductName(): string | null {
    return encodeURIComponent(this.itemId!);
  }
  
  constructor(
    private itemsService: ItemsService,
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
      const iId = this.getPathParamValueByKey("itemId");
      this.itemId = iId;
    });

    this.itemsService.getItem(this.uriEncodedProductName ?? '').subscribe(
      {
        complete: () => {
        },
        error: (error: WebApiHttpError) => {
          this.errors?.push(error);
        },
        next: (data) => {
          this.item = data;
          this.pageTitleService.deleteItemTitle = this.item?.item?.nazivproizvoda!;
        }
      }
    );
  }


  onDeleteItemClicked() {
    this.itemsService.deleteItem(this.uriEncodedProductName ?? '').subscribe(
      {
        complete: () => {
        },
        error: (error: WebApiHttpError) => {
          this.errors?.push(error);
        },
        next: () => {
          this.router.navigate(['/items']);
        }
      }
    );
  }

}
