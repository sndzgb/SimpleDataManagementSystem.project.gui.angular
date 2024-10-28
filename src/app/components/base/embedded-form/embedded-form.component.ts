import { Component, OnDestroy, OnInit } from '@angular/core';
import { NonRoutableComponent } from '../non-routable/non-routable.component';

@Component({
  selector: 'embedded-form',
  templateUrl: './embedded-form.component.html',
  styleUrls: ['./embedded-form.component.css']
})
export class EmbeddedFormComponent extends NonRoutableComponent implements OnInit, OnDestroy {

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
