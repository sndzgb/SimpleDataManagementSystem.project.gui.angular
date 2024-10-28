import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'non-routable',
  templateUrl: './non-routable.component.html',
  styleUrls: ['./non-routable.component.css']
})
export abstract class NonRoutableComponent extends BaseComponent implements OnInit {

  override ngOnInit(): void {
    super.ngOnInit();

  }
}
