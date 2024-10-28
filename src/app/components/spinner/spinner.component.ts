import { Component } from '@angular/core';
import { NonRoutableComponent } from '../base/non-routable/non-routable.component';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent extends NonRoutableComponent {

  constructor() {
    super();
  }
}
