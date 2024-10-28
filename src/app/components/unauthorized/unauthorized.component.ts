import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoutableComponent } from '../base/routable/routable.component';

@Component({
  selector: 'unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent extends RoutableComponent implements OnInit, OnDestroy {

  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
