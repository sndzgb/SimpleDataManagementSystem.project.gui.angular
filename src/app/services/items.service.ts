import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, Observable, of, retry, tap, throwError } from 'rxjs';
import { AppConfigurationService } from './app-configuration.service';
import { ItemDetails } from '../models/read/item-details.model';
import { EditItem } from '../models/write/edit-item.model';
import { Items } from '../models/read/items.model';
import { CreateItem } from '../models/write/create-item.model';
import { ItemsSearchRequest, ItemsSearchResponse } from '../models/read/items-search.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(
    private httpClient: HttpClient, 
    private appConfigurationService: AppConfigurationService
  ) {

  }


  toggleMonitoredItemAsync(itemId: string): Observable<Object> {
    itemId = encodeURIComponent(itemId);
    let response = this.httpClient.post(
      this.appConfigurationService.webApiBaseUrl + `/api/items/` + itemId + "/monitored", null
    );
    return response;
  }

  toggleItemEnabledDisabledStatus(itemId: string): Observable<Object> {
    itemId = encodeURIComponent(itemId);
    let response = this.httpClient.post(
      this.appConfigurationService.webApiBaseUrl + `/api/items/` + itemId + "/status", null
    );
    return response;
  }

  createItem(item: CreateItem): Observable<string> {

    const formData = new FormData();
    formData.append('urldoslike', item.URLdoslike!);
    formData.append('nazivproizvoda', item.nazivproizvoda!);
    formData.append('opis', item.opis!);
    formData.append('cijena', item.cijena?.toString()!);
    formData.append('kategorija', item.kategorija?.toString()!);
    formData.append('datumakcije', item.datumakcije!);
    formData.append('retailerId', item.retailerId?.toString()!);
    
    const headers = new HttpHeaders()
    return this.httpClient.post(this.appConfigurationService.webApiBaseUrl + `/api/items`,
        formData,
        { headers: headers, responseType: 'text' }
    );
  }

  getItems(enabledOnly: boolean | null = true, take: string | null = "10", page: string | null = "1"): Observable<Items> {
    
    const params = {
      take: take,
      page: page,
      enabled_only: enabledOnly
    }

    var response = 
          this.httpClient
            .get<Items>(
              this.appConfigurationService.webApiBaseUrl 
              + `/api/items?take=` + take 
              + "&page=" + page 
              + "&enabled_only=" + enabledOnly
            ).pipe(
              retry({count: 3, delay: 500}),
              catchError((error: HttpErrorResponse) => {
                if (error.status === 0) {
                  // Server not responding, connection lost?
                }
                return throwError(() => error);
              })
            );

    return response;
  }

  // updateItemPartial(itemId: string): Observable<Object> {
  //   let response = this.httpClient.patch(this.appConfigurationService.webApiBaseUrl + `/api/items/` + itemId, null);
  //   return response;
  // }

  getItem(itemId: string) : Observable<ItemDetails> {
    var response = this.httpClient.get<ItemDetails>(this.appConfigurationService.webApiBaseUrl + `/api/items/` + itemId);
    return response;
  }
    
  editItem(itemId: string, editItem: EditItem): Observable<string> {

    const formData = new FormData();
    formData.append('opis', editItem.opis ?? ''); // TODO check if valid
    formData.append('kategorija', editItem.kategorija?.toString() as string);
    formData.append('URLdoslike', editItem.URLdoslike ?? null);

    formData.append('cijena', editItem.cijena?.toString() as string);
    formData.append('datumakcije', editItem.datumakcije as string);
    formData.append('retailerId', editItem.retailerId?.toString() as string);
    formData.append('isEnabled', editItem.isEnabled?.toString() as string);
    formData.append('deleteCurrentURLdoslike', editItem.deleteCurrentURLdoslike?.toString() as string);

    // console.log(editItem);
    // return of();

    let headers = new HttpHeaders();

    let response = this.httpClient.put<string>(this.appConfigurationService.webApiBaseUrl + `/api/items/` + itemId, 
      formData,
      { headers: headers }
    );
    return response;
  }

  deleteItem(itemId: string): Observable<Object> {
    let response = this.httpClient.delete(this.appConfigurationService.webApiBaseUrl + `/api/items/` + itemId);
    return response;
  }

  searchItems(request: ItemsSearchRequest): Observable<ItemsSearchResponse> {

    const p = {
      take: request.take!,
      page: request.page!,
      sortBy: request.sortBy!,
      query: request.query!
    }
    
    return this.httpClient.get<ItemsSearchResponse>(this.appConfigurationService.webApiBaseUrl + `/api/items/search`, 
      { params: p }
    );
  }

}
