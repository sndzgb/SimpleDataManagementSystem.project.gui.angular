import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NonRoutableComponent } from '../base/non-routable/non-routable.component';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent extends NonRoutableComponent implements OnInit, OnDestroy {


  authenticated: boolean = false;
  userLoggedInSubscription?: Subscription;
  userLoggedOutSubscription?: Subscription;
  
  
  constructor(public authService: AuthService, private router: Router) {
    super();
    this.userLoggedInSubscription = this.authService.userLoggedIn$.subscribe(() => {
      this.authenticated = true;
    });
    this.userLoggedOutSubscription = this.authService.userLoggedOut$.subscribe(() => {
      this.authenticated = false;
    });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.userLoggedInSubscription?.unsubscribe();
    this.userLoggedOutSubscription?.unsubscribe();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.authenticated = this.authService.isAuthenticated();
  }
  
  isCollapsed: boolean = false;

  onHambToggle() {
    this.isCollapsed = !this.isCollapsed;
  }

}
