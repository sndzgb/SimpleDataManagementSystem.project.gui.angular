import { Component, ElementRef, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { ColorGeneratorPipe } from 'src/app/pipes/color-generator.pipe';
import { Items } from 'src/app/models/read/items.model';
import { AuthService } from 'src/app/services/auth.service';
import { RoutableComponent } from '../../base/routable/routable.component';
import { WebApiHttpError } from 'src/app/errors/web-api-http-error.error';
import { Router } from '@angular/router';

@Component({
  selector: 'items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent extends RoutableComponent implements OnInit {

  inputValue: string | null = null;
  onSearchItemsClicked() {
    this.router.navigate(['/items/search'], { queryParams: { searchQuery: encodeURIComponent(this.inputValue ?? "") } });
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

      this.itemsService.getItems(this.take, this.page).subscribe(
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
