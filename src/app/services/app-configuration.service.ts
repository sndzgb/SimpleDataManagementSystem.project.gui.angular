import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppConfigurationService {

  private appConfiguration: any;

  constructor(private httpClient: HttpClient) { 
  }

  loadAppConfig() : Promise<void> {

    var promise = firstValueFrom(
      this.httpClient.get('./assets/app-configuration.json')
    )
    .then(
      (data) => { 
        this.appConfiguration = data;
      }
    );

    return promise;
  }

  get webApiBaseUrl() : string {

    if (!this.appConfiguration) {
      throw Error('Config file not loaded!');
    }

    return this.appConfiguration.simpleDataManagementSystemBaseUrl;
  }
}
