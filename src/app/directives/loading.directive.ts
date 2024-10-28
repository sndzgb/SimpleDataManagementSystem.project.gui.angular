import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { SpinnerComponent } from '../components/spinner/spinner.component';

@Directive({
  selector: '[ngLoading]'
})
export class LoadingDirective {


  @Input()
  public set ngLoading(data: any) {

    if (data) {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
    } 
    else {
      this.viewContainer.clear();
      this.viewContainer.createComponent(SpinnerComponent);
    }
  }

  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) {
  }
}
