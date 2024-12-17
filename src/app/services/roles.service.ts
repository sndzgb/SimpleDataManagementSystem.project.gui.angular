import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AppConfigurationService } from "./app-configuration.service";
import { Role } from "../models/read/role.model";
import { Roles } from "../models/read/roles.model";

@Injectable({
    providedIn: 'root'
})
export class RolesService {

    constructor(private httpClient: HttpClient, private appConfigurationService: AppConfigurationService) {
    }

    // Array<Role>
    getAllRoles(): Observable<Roles> {

        return this.httpClient.get<Roles>(this.appConfigurationService.webApiBaseUrl + `/api/roles`);
    }
}