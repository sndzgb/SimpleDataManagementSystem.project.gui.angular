import { Component, ElementRef, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { ColorGeneratorPipe } from 'src/app/pipes/color-generator.pipe';
import { Items } from 'src/app/models/read/items.model';
import { AuthService } from 'src/app/services/auth.service';
import { RoutableComponent } from '../../base/routable/routable.component';
import { WebApiHttpError } from 'src/app/errors/web-api-http-error.error';
import { Params, Router } from '@angular/router';
import { BooleanHelpers } from 'src/app/helpers/boolean.helpers';

@Component({
  selector: 'items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent extends RoutableComponent implements OnInit {

  isIterable(obj: any) {
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
  }

  // clickedRow: string | null = null;
  // findRecursively(el: any, name: string) {

  //   if (el.namedItem('id')) {
  //       this.clickedRow = el.namedItem('id').innerHTML.trim();
  //       console.log(this.clickedRow);
  //       return;
  //   }

  //   if (!this.isIterable(el)) {
  //       return;
  //   }

  //   for (let i = 0; i < el.length; i++) {
  //     if (el[i].children.length > 0) {
  //       this.findRecursively(el[i].children, name);
  //     }
  //   }
  // }


  find(e: any, className: string): any {
  
    if (!this.isIterable(e)) {
      return null;
    }
    
    for (let i = 0; i < e.length; i++) {
      if (e[i].classList.contains(className)) {
        return e[i];
      }

      if (e[i].children.length > 0) {
        let r = this.find(e[i].children, className);
        if (!r) {
          continue;
        }
        return r;
      }
    }

    return null;
  }

  updateTotalNumberOfUsersMonitoringCounter(el: any, increase: boolean) {
    // const idName = "identifier";
    // let idValue = "";
    let tr = el.closest("tr");
    let result = this.find(tr.cells, 'total-users-monitoring-counter');

    // console.log(result);

    result.innerHTML = (parseInt(result.innerHTML) + (increase ? +1 : -1)).toString();
  }

  // monitoring
  onToggleMonitoredItemClicked($event: any) {
    
    const idName = "identifier";

    let idValue = "";
    
    let tr = $event.closest("tr");
    
    let cells = tr.cells;
    // console.log(cells);
    // return;

    for (let i = 0; i < cells.length; i++) {
      if (cells[i].className == idName) {
        idValue = cells[i].children.namedItem('id').innerHTML;
        //console.log(idValue);
      }
    }

    let increase: boolean = true;

    this.itemsService.toggleMonitoredItemAsync(idValue).subscribe({
      complete: () => { 
      },
      error: (error: WebApiHttpError) => { 
        this.errors?.push(error);
      },
      next: (data) => {
        let classes = $event.classList;

        if (classes.contains('fa-solid')) {
          classes.remove('fa-solid');
          classes.add('fa-regular');
          increase = false;
        } else {
          classes.remove('fa-regular');
          classes.add('fa-solid');
          increase = true;
        }

        this.updateTotalNumberOfUsersMonitoringCounter($event, increase);
      }
    })

    // let item = this.items?.items?.find(i => i.nazivproizvoda == "2U1 RUKSAK")?.monitoring!.isMonitoredByCurrentUser;

    // if (!item) {
    //   return;
    // }

    // this.items!.items!.find(i => i.nazivproizvoda == "2U1 RUKSAK")!.monitoring!.isMonitoredByCurrentUser = false;
  }

  // show only enabled items
  enabled_only: boolean = true;
  onCbToggle($event: Event) {
    
    //let bool: boolean = BooleanHelpers.getBoolean(this.showEnabledItemsOnly);

    this.enabled_only = !this.enabled_only;

    const queryParams: Params = { enabled_only: this.enabled_only };
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams, 
        queryParamsHandling: 'merge',
      }
    );

    //this.router.navigate(['/items'], { queryParams: { enabled_only: this.enabled_only } });
    
    //this.showEnabledItemsOnly = !bool;
    //this.showEnabledItemsOnly = !this.showEnabledItemsOnly;

  }

  // hide column
  toggleEnableDisableVisible: boolean = true;
  onToggleEnableDisableColumnClicked($event: MouseEvent) {
    this.toggleEnableDisableVisible = !this.toggleEnableDisableVisible;
  }

  onEnableDisableChanged($event: any) {
    this.itemsService.toggleItemEnabledDisabledStatus($event.value).subscribe({
      complete: () => { 
      },
      error: (error: WebApiHttpError) => { 
        this.errors?.push(error);
      },
      next: (data) => {
      }
    });
  }

  inputValue: string | null = "";
  onSearchItemsClicked() {
    if (!this.inputValue || this.inputValue.length == 0) {
      this.inputValue = null;
      return;
    }

    this.router.navigate(['/items/search'], { queryParams: { query: encodeURIComponent(this.inputValue ?? "") } });
  }
  

  items: Items | undefined;
  take: string = "8";
  page: string = "1";

  override ngOnInit(): void {

    super.ngOnInit();

    this.pageTitleService.itemsTitle;

    this.queryParamsChanged.subscribe(() => {
      this.take = this.getQueryParamValueByKey("take") ?? this.take;
      this.page = this.getQueryParamValueByKey("page") ?? this.page;
      this.enabled_only = BooleanHelpers.getBoolean(this.getQueryParamValueByKey("enabled_only")) ?? true;

      this.itemsService.getItems(this.enabled_only, this.take, this.page).subscribe(
        {
          complete: () => { 
          },
          error: (error: WebApiHttpError) => { 
            this.errors?.push(error);
          },
          next: (data) => {
            this.items = data;
          }
        }
      );
    });



    return;

  }


  constructor(
    private router: Router,
    public itemsService: ItemsService, 
    public colorGeneratorPipe: ColorGeneratorPipe,
    public authService: AuthService
  ) {
    super();

  }
}
