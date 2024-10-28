import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutableComponent } from '../base/routable/routable.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends RoutableComponent implements OnInit {
    
  constructor(public router: Router) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    
    this.pageTitleService.indexTitle;
  }

  title = 'Welcome to Simple Data Management System';

}
