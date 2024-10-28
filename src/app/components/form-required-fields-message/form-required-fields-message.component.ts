import { Component } from '@angular/core';
import { NonRoutableComponent } from '../base/non-routable/non-routable.component';

@Component({
  selector: 'form-required-fields-message',
  templateUrl: './form-required-fields-message.component.html',
  styleUrls: ['./form-required-fields-message.component.css']
})
export class FormRequiredFieldsMessageComponent extends NonRoutableComponent {

  constructor() {
    super();
  }
}
