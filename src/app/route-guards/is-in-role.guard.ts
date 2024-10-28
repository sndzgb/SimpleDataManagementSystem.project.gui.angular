import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Roles } from '../constants/roles';
import { AuthService } from '../services/auth.service';

export const isInRoleGuard: CanActivateFn = (route, state) => {
  
  const router: Router = inject(Router);
  const userRole: Roles = inject(AuthService).getUserRole();
  const expectedRoles: Roles[] = route.data['roles'];
  if (userRole === Roles.Anonymous) {
    router.navigate(['/account/login'], { queryParams: { returnUrl: state.url == "/" ? null : state.url }});
    return false;
  }

  const hasRole: boolean = expectedRoles.some((role) => userRole === role);
  if (hasRole) {
    return true;
  } else {
    router.navigate(['unauthorized']);
    return false;
  }
  }
