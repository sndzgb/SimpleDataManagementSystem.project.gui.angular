import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoutableComponent } from '../../base/routable/routable.component';
import { AuthService } from 'src/app/services/auth.service';
import { ItemsService } from 'src/app/services/items.service';
import { Item, ItemDetails } from 'src/app/models/read/item-details.model';
import { WebApiHttpError } from 'src/app/errors/web-api-http-error.error';

@Component({
  selector: 'item-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class ItemDetailsComponent extends RoutableComponent implements OnInit, OnDestroy {

  nazivproizvoda: string | null = null;
  item: ItemDetails | null = null;

  constructor(
    private itemsService: ItemsService,
    public authService: AuthService
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.pathParmsChanged.subscribe(() => { 
      const iId = this.getPathParamValueByKey("itemId");
      this.nazivproizvoda = iId;
    });

    this.itemsService.getItem(encodeURIComponent(this.nazivproizvoda!)).subscribe(
      {
        complete: () => {
        },
        error: (error: WebApiHttpError) => {
          this.errors?.push(error);
        },
        next: (data) => {
          this.item = data;
          this.pageTitleService.itemDetailsTitle = this.item.item?.nazivproizvoda!;
        }
      }
    );
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
