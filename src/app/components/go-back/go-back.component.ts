import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NonRoutableComponent } from '../base/non-routable/non-routable.component';

@Component({
  selector: 'go-back',
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.css']
})
export class GoBackComponent extends NonRoutableComponent implements OnInit {
  
  constructor(private location: Location) {
    super();
  }
  
  override ngOnInit(): void {
    super.ngOnInit();
    
  }

  // TODO
  onGoBackClicked() {
    this.location.back();
  }

}
