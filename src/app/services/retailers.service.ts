import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, Observable, of } from "rxjs";
import { AppConfigurationService } from "./app-configuration.service";
import { Retailers } from "../models/read/retailers.model";
import { CreateRetailer } from "../models/write/create-retailer.model";
import { EditRetailer } from "../models/write/edit-retailer.model";
import { RetailerDetails } from "../models/read/retailer-details.model";

@Injectable({
    providedIn: 'root'
})
export class RetailersService {
    
    constructor(private httpClient: HttpClient, private appConfigurationService: AppConfigurationService) {
    }

    getAllRetailers(take: number = 8, page: number = 1): Observable<Retailers> {
        const params = {
            take: take,
            page: page
        };

        return this.httpClient.get<Retailers>(this.appConfigurationService.webApiBaseUrl + `/api/retailers`, {params: params});
    }

    getRetailer(retailerId: number): Observable<RetailerDetails> {
        return this.httpClient.get<RetailerDetails>(this.appConfigurationService.webApiBaseUrl + `/api/retailers/` + retailerId);
    }

    createRetailer(model: CreateRetailer): Observable<Object> {
        let formData = new FormData();
        formData.append('name', model.name!);
        formData.append('priority', model.priority?.toString()!);
        formData.append('logoImage', model.logoImage!);

        return this.httpClient.post(this.appConfigurationService.webApiBaseUrl + `/api/retailers`, formData);
    }

    editRetailer(retailerId: number, model: EditRetailer): Observable<Object> {
        let formData = new FormData();
        formData.append('name', model.name!);
        formData.append('priority', model.priority?.toString()!);
        formData.append('logoImage', model.logoImage!);
        formData.append('deleteCurrentLogoImage', model.deleteCurrentLogoImage?.toString() as string);
        
        return this.httpClient.put(this.appConfigurationService.webApiBaseUrl + `/api/retailers/` + retailerId, formData);
    }

    updateRetailerPartial(retailerId: number): Observable<Object> {
        let response = this.httpClient.patch(this.appConfigurationService.webApiBaseUrl + `/api/retailers/` + retailerId, null);
        return response;
    }

    deleteRetailer(retailerId: number): Observable<Object> {
        let response = this.httpClient.delete(this.appConfigurationService.webApiBaseUrl + `/api/retailers/` + retailerId);
        return response;
    }
  
}