import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { WebApiHttpError } from 'src/app/errors/web-api-http-error.error';
import { PageTitleService } from 'src/app/services/page-title.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
@Component({
  selector: 'routable',
  templateUrl: './routable.component.html',
  styleUrls: ['./routable.component.css']
})
export abstract class RoutableComponent extends BaseComponent implements OnInit, OnDestroy {

  protected pageTitleService = inject(PageTitleService);
  protected activatedRoute = inject(ActivatedRoute);

  private pathParamMapSubscription: Subscription | null = null;
  private queryParamMapSubscription: Subscription | null = null;
  private pathParamMap: ParamMap | null = null;
  private queryParamMap: ParamMap | null = null;

  /**
    * Contains errors that might occur during web api (backend) calls; does not hold global/ app level, and/ or unhandled errors.
  */
  errors: WebApiHttpError[] = []; //| null = null;
  
  /**
    * Returns path parameter value using the provided name (key).
    * @remarks
    * The result can be null if the path parameter does not exist.
    *
    * @param name - Name (key) of the path parameter.
    * @returns Value for the specified path parameter name (key), or null if it does not exist.
  */
  getPathParamValueByKey(name: string): string | null {
    return this.pathParamMap?.get(name) ?? null;
  }

  /**
    * Returns query parameter value using the provided name (key).
    * @remarks
    * The result can be null if the query parameter does not exist.
    *
    * @param name - Name (key) of the query parameter.
    * @returns Value for the specified query parameter name (key), or null if it does not exist.
  */
  getQueryParamValueByKey(name: string): string | null {
    return this.queryParamMap?.get(name) ?? null;
  }

  override ngOnInit(): void {
    super.ngOnInit();
    
    this.queryParamMapSubscription = this.activatedRoute.queryParamMap.subscribe((data) => 
      { 
        this.queryParamMap = data;
        this.onQueryParamsChanged();
      });
    this.pathParamMapSubscription = this.activatedRoute.paramMap.subscribe((data) => 
      { 
        this.pathParamMap = data;
        this.onPathParamsChanged();
      });
  }
  
  private onQueryParamsChanged() {
    this.queryParams.next(null);
  }
  queryParams = new BehaviorSubject(null);
  queryParamsChanged = this.queryParams.asObservable();

  private onPathParamsChanged() {
    this.pathParams.next(null);
  }
  pathParams = new BehaviorSubject(null);
  pathParmsChanged = this.pathParams.asObservable();

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    this.queryParamMapSubscription?.unsubscribe();
    this.pathParamMapSubscription?.unsubscribe();
  }

}
