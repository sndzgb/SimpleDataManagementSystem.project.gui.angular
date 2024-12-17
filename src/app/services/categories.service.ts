import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfigurationService } from "./app-configuration.service";
import { Observable } from "rxjs";
import { Categories } from "../models/read/categories.model";
import { CreateCategory } from "../models/write/create-category.model";
import { EditCategory } from "../models/write/edit-category.model";
import { CategoryDetails } from "../models/read/category-details.model";

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    constructor(private httpClient: HttpClient, private appConfigurationService: AppConfigurationService) {
    }

    getAll(take: number = 8, page: number = 1): Observable<Categories> {
        let params = new HttpParams();
        params.append('page', page);
        params.append('take', take);
        
        const p = {
            take: take,
            page: page
        }

        return this.httpClient.get<Categories>(this.appConfigurationService.webApiBaseUrl + `/api/categories`, {params: p});
    }

    createCategory(model: CreateCategory): Observable<Object> {
        return this.httpClient.post(this.appConfigurationService.webApiBaseUrl + `/api/categories`,
            {
                "name": model.name,
                "priority": model.priority
            }
        );
    }

    editCategory(categoryId: number, model: EditCategory): Observable<Object> {
        return this.httpClient.put(this.appConfigurationService.webApiBaseUrl + `/api/categories/` + categoryId,
            {
                "name": model.name,
                "priority": model.priority
            }
        );
    }

    getCategoryById(categoryId: number): Observable<CategoryDetails> {
        return this.httpClient.get<CategoryDetails>(this.appConfigurationService.webApiBaseUrl + `/api/categories/` + categoryId);
    }

    deleteCategory(categoryId: number): Observable<Object> {
        let response = this.httpClient.delete(this.appConfigurationService.webApiBaseUrl + `/api/categories/` + categoryId);
        return response;
    }
}