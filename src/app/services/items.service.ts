import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, Observable, of, tap, throwError } from 'rxjs';
import { AppConfigurationService } from './app-configuration.service';
import { Item } from '../models/read/item.model';
import { EditItem } from '../models/write/edit-item.model';
import { Items } from '../models/read/items.model';
import { CreateItem } from '../models/write/create-item.model';
@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private httpClient: HttpClient, private appConfigurationService: AppConfigurationService) {
    
  }

  createItem(item: CreateItem): Observable<string> {

    const formData = new FormData();
    formData.append('urldoslike', item.URLdoslike!); //, item.URLdoslike.name);
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

  getItems(take: string | null = "10", page: string | null = "1") : Observable<Items> {
    
    const params = {
      take: take,
      page: page
    }

    var response = 
          this.httpClient
                    .get<Items>(this.appConfigurationService.webApiBaseUrl + `/api/items?take=` + take + "&page=" + page);

    return response;
  }

  updateItemPartial(itemId: string): Observable<Object> {
    let response = this.httpClient.patch(this.appConfigurationService.webApiBaseUrl + `/api/items/` + itemId, null);
    return response;
  }

  getItem(itemId: string) : Observable<Item> {
    var response = this.httpClient.get<Item>(this.appConfigurationService.webApiBaseUrl + `/api/items/` + itemId);
    return response;
  }
    
  editItem(itemId: string, editItem: EditItem): Observable<string> {

    const formData = new FormData();
    formData.append('opis', editItem.opis ?? ''); // TODO check if valid
    formData.append('kategorija', editItem.kategorija.toString());
    formData.append('URLdoslike', editItem.URLdoslike ?? null);

    formData.append('cijena', editItem.cijena.toString());
    formData.append('datumakcije', editItem.datumakcije);
    formData.append('retailerId', editItem.retailerId.toString());

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

  }
