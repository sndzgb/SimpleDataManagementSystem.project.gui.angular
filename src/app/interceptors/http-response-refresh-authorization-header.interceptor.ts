import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpResponseRefreshAuthorizationHeaderInterceptor implements HttpInterceptor {

  constructor(public authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next
      .handle(request)
      .pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            let authorizationHeaderValue: string | null = event.headers.get("Set-Authorization");

            if (authorizationHeaderValue) {
              this.authService.setAuthenticationToken(authorizationHeaderValue);
            }
          }
          return event;
        })
      );
  }
}
