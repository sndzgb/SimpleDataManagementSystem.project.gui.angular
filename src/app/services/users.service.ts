import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfigurationService } from "./app-configuration.service";
import { Observable } from "rxjs";
import { User } from "../models/read/user.model";
import { Users } from "../models/read/users.model";
import { CreateUser } from "../models/write/create-user.model";
import { EditUser } from "../models/write/edit-user.model";

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(private httpClient: HttpClient, private appConfigurationService: AppConfigurationService) {
    }

    createUser(user: CreateUser): Observable<string> {
        return this.httpClient.post(this.appConfigurationService.webApiBaseUrl + `/api/users`,
            {
                "username": user.username,
                "password": user.password,
                "roleId": user.roleId
            },
            { responseType: 'text' }
        );
    }

    getUsers(take: string = "8", page: string = "1"): Observable<Users> {
        let params = new HttpParams();
        params = params.append('take', take);
        params = params.append('page', page);

        return this.httpClient.get<Users>(this.appConfigurationService.webApiBaseUrl + `/api/users`, { params: params });
    }

    getUser(userId: number): Observable<User> {
        var response = this.httpClient.get<User>(this.appConfigurationService.webApiBaseUrl + `/api/users/` + userId);
        return response;
    }

    editUser(userId: number, editUser: EditUser): Observable<Object> {
        
        return this.httpClient.put(this.appConfigurationService.webApiBaseUrl + `/api/users/` + userId,
            {
                "roleId": editUser.roleId,
                "username": editUser.username
            }
        );
    }

    deleteUser(userId: number): Observable<Object> {
        return this.httpClient.delete(this.appConfigurationService.webApiBaseUrl + `/api/users/` + userId);
    }
}