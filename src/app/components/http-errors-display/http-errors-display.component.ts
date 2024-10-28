import { Component, Input, OnInit } from '@angular/core';
import { WebApiHttpError } from 'src/app/errors/web-api-http-error.error';
import { NonRoutableComponent } from '../base/non-routable/non-routable.component';

@Component({
  selector: 'http-errors-display',
  templateUrl: './http-errors-display.component.html',
  styleUrls: ['./http-errors-display.component.css']
})
export class HttpErrorsDisplayComponent extends NonRoutableComponent implements OnInit { //BaseComponent

  @Input() errors: WebApiHttpError[] | null = null;

  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

}
