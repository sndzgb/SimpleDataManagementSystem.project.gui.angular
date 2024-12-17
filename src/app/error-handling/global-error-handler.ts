import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { ToastService } from "../services/toast.service";
import { ToastType } from "../constants/toast-type";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    
    constructor(private injector: Injector) {
    }

    handleError(error: any): void {
        let toastService = this.injector.get(ToastService);

        const message = "Unexpected error occured. Please try again.";
        
        toastService.show(message, ToastType.danger);
    }
}
