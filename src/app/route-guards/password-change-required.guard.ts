import { inject } from "@angular/core";
import { ActivatedRoute, CanActivateFn, Router } from "@angular/router";
import { AuthenticationItems, AuthService } from "../services/auth.service";

export const passwordChangeRequiredGuard: CanActivateFn = (route, state) => { 

    const router: Router = inject(Router);
    const authService: AuthService = inject(AuthService);
    
    let isPasswordChangeRequired = authService.getAuthenticationItemValueByKey(AuthenticationItems.IsPasswordChangeRequired);

    if (isPasswordChangeRequired?.toLowerCase() == "true") {
        router.navigate(['/account/password-change']);//, { queryParams: { returnUrl: state.url == "/" ? null : state.url }});
        return false;
    }

    return true;
}