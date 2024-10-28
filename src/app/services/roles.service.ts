import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AppConfigurationService } from "./app-configuration.service";
import { Role } from "../models/read/role.model";

@Injectable({
    providedIn: 'root'
})
export class RolesService {

    constructor(private httpClient: HttpClient, private appConfigurationService: AppConfigurationService) {
    }

    getAllRoles(): Observable<Array<Role>> {

        return this.httpClient.get<Array<Role>>(this.appConfigurationService.webApiBaseUrl + `/api/roles`);
    }
}