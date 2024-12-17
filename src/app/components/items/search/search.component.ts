import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { WebApiHttpError } from 'src/app/errors/web-api-http-error.error';
import { ItemsSearchRequest, ItemsSearchResponse, SortableItem, SortableItemIntoLabelMapping } from 'src/app/models/read/items-search.model';
import { FormComponent } from '../../base/form/form.component';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'items-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class ItemsSearchComponent extends FormComponent<ItemsSearchResponse> implements OnInit, OnDestroy {

  onClearSearchParametersClicked() {
    this.formGroup.reset();
  }

  collapsed: boolean = false;

  onCollapseSearchMenuClicked() {
    this.collapsed = !this.collapsed;
  }

  onCollapseSearchMenu() {
    this.collapsed = !this.collapsed;
  }

  SortableItemDisplay: { [index: number]: string } = { };

  public SortableItemIntoLabelMapping = typeof SortableItemIntoLabelMapping; // user friendly name
  public sortableItems = Object.values(SortableItem).slice(Object.keys(SortableItem).length / 2);
  public sortableItemTypes = Object.values(SortableItem).filter(value => typeof value === 'number');

  take: number | null = 8;
  page: number | null = 1;
  sortBy: number | null = SortableItem.nazivproizvodaAsc;
  query: string | null = "";
  oldQuery: string | null = null;

  items: ItemsSearchResponse | null = null;


  constructor(
    private router: Router,
    private itemsService: ItemsService
  ) {
    super();
  }

  getUserFriendlyEnumName(ix: any): string {
    return this.SortableItemDisplay[ix];
  }


  override ngOnInit(): void {
    super.ngOnInit();

    this.formGroup.addControl("query", new FormControl(null, [ Validators.required ]));
    this.formGroup.addControl("page", new FormControl(null, null));
    this.formGroup.addControl("sortBy", new FormControl(null, null));
    this.formGroup.addControl("take", new FormControl(null, null));
    
    this.SortableItemDisplay[SortableItem.nazivproizvodaAsc] = "Naziv proizvoda Asc";
    this.SortableItemDisplay[SortableItem.nazivproizvodaDesc] = "Naziv proizvoda Desc";
    this.SortableItemDisplay[SortableItem.cijenaAsc] = "Cijena Asc";
    this.SortableItemDisplay[SortableItem.cijenaDesc] = "Cijena Desc";

    this.queryParamsChanged.subscribe(() => { 

      this.errors = [];
      this.items = null;

      this.oldQuery = this.query;
      this.query = decodeURIComponent(this.getQueryParamValueByKey("query") ?? "");
      
      if (this.oldQuery != this.query) {
        this.page = 1;
        this.take = 8;
      } else {
        this.page = +(this.getQueryParamValueByKey("page") ?? 1);
        this.take = +(this.getQueryParamValueByKey("take") ?? 8);
      }
      

      let sort = this.getQueryParamValueByKey("sortBy");
      let h = SortableItem[sort as keyof typeof SortableItem];
      if (h) {
        this.sortBy = +(sort ?? SortableItem.nazivproizvodaAsc); 
      }

      this.formGroup.patchValue({
        take: this.take,
        page: this.page,
        sortBy: this.sortBy,
        query: this.query ?? "" //decodeURIComponent(this.query ?? "")
      });

      this.itemsService.searchItems(
        new ItemsSearchRequest(
          this.formGroup.value
        )
      ).subscribe(
        {
          complete: () => {
          },
          error: (error: WebApiHttpError) => {
            this.errors?.push(error);
          },
          next: (data) => {
            this.items = data;
            this.pageTitleService.searchItemsTitle = null;
          }
        }
      );
    });
  }

  text: string = "<span style='background-color:yellow; font-weight:bold;'>Hello</span>, World!";

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  rplc(originalValue: string, startIndex: number, replaceCharNumbers: number): string {
    let value = originalValue.substring(startIndex, startIndex + replaceCharNumbers);
    
    let labeled = "<label class='HIGHLIGHTED-TEXT'>" + value + "</label>";
    let final = originalValue.substring(0, startIndex) + labeled + originalValue.substring(startIndex + replaceCharNumbers);

    return final;
  }

  getHighlightedText(txt: string | null): string | null {
    // TODO ...
    let x1 = decodeURIComponent(this.query!)
      .toLocaleUpperCase("hr-HR").normalize('NFD').replace(/\p{Diacritic}/gu, '');
    
    let x2 = txt?.toLocaleUpperCase("hr-HR").normalize('NFD').replace(/\p{Diacritic}/gu, '');

    let indexOf = x2?.indexOf(x1);
    if (indexOf != -1) {
      let rpl = this.rplc(txt!, indexOf!, this.query?.length!);
      return rpl.toUpperCase();
    } else {
      return txt;
    }
  }

  // replace(index: number, replacement: string, old: string): string {
  //   return old.substring(0, index) 
  //     + "<label style='background-color:yellow; font-weight:bold;'>" 
  //     + replacement 
  //     + "</label>" 
  //     + old.substring(index + replacement.length);
  // }
  
  onSearchFormSubmitted() {

    let take = this.formGroup.get('take')?.value;
    let page = this.formGroup.get('page')?.value;
    let query = this.formGroup.get('query')?.value;
    let sortBy = this.formGroup.get('sortBy')?.value;
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams: { 
          take: take, 
          page: page, 
          sortBy: sortBy, 
          query: encodeURIComponent(query ?? "")
        },
        queryParamsHandling: 'merge',
        replaceUrl: true
      }
    );
  }

}
