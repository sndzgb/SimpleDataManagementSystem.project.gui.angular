import { Component, OnInit } from '@angular/core';
import { RoutableComponent } from '../base/routable/routable.component';

@Component({
  selector: 'forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css']
})
export class ForbiddenComponent extends RoutableComponent implements OnInit {

  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }
  
}
