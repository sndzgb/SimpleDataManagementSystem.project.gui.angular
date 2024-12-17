import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AppConfigurationService } from './app-configuration.service';
import { UpdatePassword } from '../models/write/update-password.model';
import { Login } from '../models/read/login.model';
import { AuthToken } from '../models/read/auth-token.model';
import { UserDetails } from '../models/read/user-details.model';
@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(
    private httpClient: HttpClient, 
    private appConfigurationService: AppConfigurationService
  ) {
  }

  login(login: Login): Observable<AuthToken> {
    let response = this.httpClient.post<AuthToken>(this.appConfigurationService.webApiBaseUrl + `/api/accounts`, 
      {
        "username": login.username,
        "password": login.password
      },
    );

    return response;
  }

  getAccountDetails(): Observable<UserDetails> {
    return this.httpClient.get<UserDetails>(this.appConfigurationService.webApiBaseUrl + `/api/accounts/details`);
  }

  updatePassword(model: UpdatePassword): Observable<Object> {
    return this.httpClient.put(this.appConfigurationService.webApiBaseUrl + `/api/accounts/password`, model);
  }
}
