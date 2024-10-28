import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from 'src/app/constants/toast-type';
import { RoutableComponent } from '../../base/routable/routable.component';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent extends RoutableComponent implements OnInit {
  

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private toastService: ToastService
  ) {

      super();
      if (!authService.isAuthenticated()) {
        this.toastService.show("You are not authenticated.", ToastType.default);
        this.router.navigate(['/account/login']);
        return;
      }
  }


  override ngOnInit(): void {
    super.ngOnInit();
  }

  onLogoutClicked() {
    this.authService.clearAuthentication(); // TODO put LOGIN/ LOGOUT events in here!!
    this.router.navigate(['/account/login'], { queryParams: { returnUrl: this.router.url == "/" ? null : this.router.url }});
  }

}
