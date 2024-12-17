import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
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
  
  // https://stackoverflow.com/questions/48994514/get-element-that-was-clicked
  // TODO use angular approach
  onExpandClicked(event: any) {
    
    let optionsToggle = event.closest('.link').querySelector('.dropdown-options');
    let el = event.classList; // NEW
    if (optionsToggle.classList.contains('active-anchor')) {
        optionsToggle.classList.remove('active-anchor');
        optionsToggle.classList.add('collapsed-items-dropdown-menu');
        
        el.remove('fa-caret-down'); // NEW
        el.add('fa-caret-up'); // NEW
        return;
    } else {
        let allOptions = document.getElementsByClassName('dropdown-options');
        for (let i = 0, len = allOptions.length; i < len; i++) {
          allOptions[i].classList.remove('active-anchor');
        }
        optionsToggle.classList.add('active-anchor');
        el.remove('fa-caret-up'); // NEW
        el.add('fa-caret-down'); // NEW
    }

    const options = document.getElementsByClassName('dropdown-options');

    for (let i = 0, len = options.length; i < len; i++) {
      if (!options[i].classList.contains('.collapsed-items-dropdown-menu')) {
          options[i].classList.add('collapsed-items-dropdown-menu');
      }
    }
    let toggle = event.closest('.link').querySelector('.dropdown-options');
    toggle.classList.remove('collapsed-items-dropdown-menu');
  }


  //isCollapsed: boolean = false;
  onHambClicked(event: any) {
    let links = document.getElementsByClassName('toggleable');
    
    for (let i = 0, len = links.length; i < len; i++) {
      links[i].classList.toggle("collapsed");
    }

    // this.isCollapsed = !this.isCollapsed;
  }

}
