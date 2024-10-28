import { AfterContentInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Pager } from 'src/app/models/pager';
import { NonRoutableComponent } from '../base/non-routable/non-routable.component';
import { PageInfo } from 'src/app/models/read/page-info.model';
export class keyvaluepair {
  constructor(k: string, v: string) {
    this.key = k;
    this.value = v;
  }

  key: string;
  value: string;
}

export class SingleLinkKvpCollection {
  kvps: any = {};
}

@Component({
  selector: 'pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent extends NonRoutableComponent implements OnInit, AfterContentInit, OnChanges {
  @Input()
  pageInfo: PageInfo | null = null;

  pager: Pager | null = null;
  url: string | null = "";
  myUrl = {};

  constructor(private router: Router) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterContentInit(): void {

  }


  ngOnChanges(changes: SimpleChanges): void {
    this.pager = new Pager(this.pageInfo?.total!, this.pageInfo?.page!, this.pageInfo?.take!);

    let activatedUrl = this.router.url;
    let split = activatedUrl.split('?');
    let basePath = split[0];
    let queryParams = split[1];

    let kvp = queryParams?.split('&');

    const params = new URLSearchParams(queryParams);
    params.delete('take');
    params.delete('page');

    this.url += basePath; // + "?";
    let dynamic: string = "";

    let myUrlHelper: any = {};

    params.forEach(function(value, key) {
      dynamic +=  key + '=' + value + '&';

      myUrlHelper[key] = value;
    });

    
    this.myUrl = myUrlHelper;

    let firstPageParams: any = {};
    params.forEach(function(value, key) {
      firstPageParams[key] = value;
    });
    firstPageParams["page"] = 1;
    firstPageParams["take"] = this.pager.PageSize;
    this.firstPage = firstPageParams;



    let previousPageParams: any = {};
    params.forEach(function(value, key) {
      previousPageParams[key] = value;
    });
    previousPageParams["page"] = (this.pager.CurrentPage! - 1);
    previousPageParams["take"] = this.pager.PageSize!;
    this.previousPage = previousPageParams;

    let nextPageParams: any = {};
    params.forEach(function(value, key) {
      nextPageParams[key] = value;
    });
    nextPageParams["page"] = (this.pager.CurrentPage! + 1);
    nextPageParams["take"] = this.pager.PageSize!;
    this.nextPage = nextPageParams;

    let lastPageParams: any = {};
    params.forEach(function(value, key) {
      lastPageParams[key] = value;
    });
    lastPageParams["page"] = (this.pager.TotalPages);
    lastPageParams["take"] = this.pager.PageSize!;
    this.lastPage = lastPageParams;

    
    for (let page = this.pager.StartPage; page! <= this.pager?.EndPage!; page!++) {

      let singleLinkKvpCollection: SingleLinkKvpCollection = new SingleLinkKvpCollection();
      
      for (let index = 0; index < kvp?.length; index++) {
        let v = kvp[index];
        let kv = v.split('=');
        if (kv[0] === "take") {
          continue;
        }
        if (kv[0] === "page") {
          continue;
        }
        singleLinkKvpCollection.kvps[kv[0]] = kv[1];
        
        let skvp: any = {};
        skvp[kv[0]] = kv[1];
      }
      
      singleLinkKvpCollection.kvps["page"] = page?.toString();
      singleLinkKvpCollection.kvps["take"] = this.pager.PageSize?.toString();

      this.middlePages.push(singleLinkKvpCollection);

    }

    return;

  }

  prms: any = {};
  firstPage: any = {};
  previousPage: any = {};
  lastPage: any = {};
  nextPage: any = {};
  middlePages: Array<SingleLinkKvpCollection> = new Array<SingleLinkKvpCollection>();
  
}

