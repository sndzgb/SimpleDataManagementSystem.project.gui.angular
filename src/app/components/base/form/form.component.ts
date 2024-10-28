import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NgControlStatus } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormStatus } from 'src/app/constants/form-status';
import { RoutableComponent } from '../routable/routable.component';

@Component({
  selector: 'form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export abstract class FormComponent<T> extends RoutableComponent implements OnInit, OnDestroy {
  
  // TODO add "FormSubmitSuccess()", "FormSubmitFailure()", "FormSubmit()" abstract functions
  formGroup: FormGroup = new FormGroup({});
  formStatusChangedSubscription: Subscription | undefined;
  formValid: boolean = false;

  override ngOnInit(): void {
    super.ngOnInit();
    
    this.formStatusChangedSubscription = this.formGroup.statusChanges.subscribe((status) => {
      switch (status) {
        case FormStatus.VALID:
          this.formValid = true;
          break;
        case FormStatus.INVALID:
          this.formValid = false;
          break;
        case FormStatus.PENDING:
          this.formValid = false;
          break;
        case FormStatus.DISABLED:
          this.formValid = false;
          break;
        default:
          this.formValid = false;
          break;
      }
    });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.formStatusChangedSubscription?.unsubscribe();
  }

  
}

