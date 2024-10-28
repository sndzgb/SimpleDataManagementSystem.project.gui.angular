import { inject } from "@angular/core";
import { ActivatedRoute, CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const isAuthenticatedGuard: CanActivateFn = (route, state) => { 

    const router: Router = inject(Router);
    const authService: AuthService = inject(AuthService);

    if (!authService.isAuthenticated()) {
        router.navigate(['/account/login'], { queryParams: { returnUrl: state.url == "/" ? null : state.url }});
        return false;
    }

    return true;
}