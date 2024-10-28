import { Injectable } from '@angular/core';
import { Roles } from '../constants/roles';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Jwt } from '../models/jwt';
import { BehaviorSubject } from 'rxjs';

export enum AuthenticationItems {
  UserId = "UserId",
  Username = "Username",
  IsPasswordChangeRequired = "IsPasswordChangeRequired",
  Role = "Role",
  Jwt = "Jwt"
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Observable source
  private _userLoggedInSource = new BehaviorSubject(null);
  // Observable stream
  userLoggedIn$ = this._userLoggedInSource.asObservable();

  // Observable source
  private _userLoggedOutSource = new BehaviorSubject(null);
  // Observable stream
  userLoggedOut$ = this._userLoggedOutSource.asObservable();


  setAuthentication(token: string): void {
    const decodedToken = jwtDecode<Jwt>(token);

    const userId = decodedToken.UserId;
    const username = decodedToken.Username;
    const isPasswordChangeRequired = decodedToken.IsPasswordChangeRequired;
    const role = JSON.parse(
      window.atob(token.split('.')[1])
    )["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    localStorage.setItem(AuthenticationItems.UserId, userId!.toString());
    localStorage.setItem(AuthenticationItems.Username, username!.toString());
    localStorage.setItem(AuthenticationItems.IsPasswordChangeRequired, isPasswordChangeRequired!.toString());
    localStorage.setItem(AuthenticationItems.Role, Roles[role]);

    localStorage.setItem(AuthenticationItems.Jwt, token);

    this._userLoggedInSource.next(null);
  }

  clearAuthentication(): void {
    localStorage.clear(); // TODO remove only authentication items (use keys)
    this._userLoggedOutSource.next(null);
  }

  getAuthenticationItemValueByKey(key: AuthenticationItems): string | null {
    let item = localStorage.getItem(key.toString());
    return item;
  }
  
  setAuthenticationToken(token: string) {
    const decodedToken = jwtDecode<Jwt>(token);
    const role: string = JSON.parse(
      window.atob(token.split('.')[1])
    )["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    localStorage.setItem("access_token", token);
  }

  clearUser(): void {
    // remove all claims, roles, tokens, ...
  }

  getAuthenticationToken(): string | null {
    return localStorage.getItem("access_token");
  }

  removeAuthenticationToken(): void {
    localStorage.removeItem("access_token");
  }

  setUserRole(roleId: number): void {
    localStorage.setItem("role", roleId.toString());
  }

  constructor() { }

  getUserRole(): Roles {
    let ls = localStorage.getItem('Role');
    if (!ls) {
      return Roles.Anonymous;
    }

    let h = Roles[ls as keyof typeof Roles];
    // TODO dynamic values
    switch(ls) {
      case Roles.Admin.toString(): {
        return Roles.Admin;
      }
      case Roles.Employee.toString(): {
        return Roles.Employee;
      }
      case Roles.User.toString(): {
        return Roles.User;
      }
      case Roles.Anonymous.toString(): {
        return Roles.Anonymous;
      }
      default: {
        throw new Error("Enum not implemented. Type: " + typeof(Roles));
      }
    }
  }

  isAuthenticated(): boolean {

    const token: string | null = localStorage.getItem('Jwt'); // get token from local storage

    if (!token) {
      return false;
    }
    
    
    const decodedToken = jwtDecode<Jwt>(token);
    return decodedToken.exp! > Date.now() / 1000;
  }
}