import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { inject, Injectable, Renderer2 } from "@angular/core";
import { catchError, EMPTY, Observable, throwError } from "rxjs";
import { ToastService } from "../services/toast.service";
import { ToastType } from "../constants/toast-type";
import { ActivatedRoute, Router } from "@angular/router";
import { WebApiHttpError } from "../errors/web-api-http-error.error";
import { HttpError } from "../models/read/http-error.model";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(
        private toastService: ToastService,
        private router: Router
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
            .handle(request)
            .pipe(catchError((error: HttpErrorResponse) => {

                let returnUrl2: string = this.router.url;
                if (error.status == 0) {
                    this.toastService.show("Server unavailable.", ToastType.warning);
                    return EMPTY;
                }
                
                if (error.status == HttpStatusCode.Forbidden) {
                    this.toastService.show("You are not authorized to view this resource.", ToastType.danger);
                    this.router.navigate(['/forbidden']);
                    return EMPTY;
                } else if (error.status == HttpStatusCode.Unauthorized) {
                    this.toastService.show("Please login to continue.", ToastType.danger);
                    this.router.navigate(['/account/login'], { queryParams: { returnUrl: returnUrl2 }});
                    return EMPTY;
                }

                let e = error.error as HttpError;

                return throwError(() => new WebApiHttpError(e.message, e.statusCode, e.errors));

            }
        ));
    } 
    
}