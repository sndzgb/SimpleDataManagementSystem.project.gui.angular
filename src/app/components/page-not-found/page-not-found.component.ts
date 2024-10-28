import { Component } from '@angular/core';
import { RoutableComponent } from '../base/routable/routable.component';

@Component({
  selector: 'page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent extends RoutableComponent {

  constructor() {
    super();
  }
}
