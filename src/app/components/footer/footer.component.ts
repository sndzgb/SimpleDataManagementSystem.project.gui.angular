import { Component } from '@angular/core';
import { NonRoutableComponent } from '../base/non-routable/non-routable.component';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent extends NonRoutableComponent {

  constructor() {
    super();
  }
}
