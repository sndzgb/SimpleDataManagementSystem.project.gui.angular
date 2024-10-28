import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastType } from 'src/app/constants/toast-type';
import { Toast, ToastService } from 'src/app/services/toast.service';
import { NonRoutableComponent } from '../base/non-routable/non-routable.component';

@Component({
  selector: 'toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent extends NonRoutableComponent implements OnInit {

  getToastCssClass(t: ToastType | undefined): string {
    switch(t) {
      case ToastType.success:
        return "success"; //["white", "#00ff00"];
      case ToastType.warning:
        return "warning"; //["white", "#ff8000"];
      case ToastType.danger:
        return "danger"; //["white", "#ff0000"];
      case ToastType.default:
        return "default"; //["black", "white"];
      default:
        return "default"; //["black", "white"];
    }
  }
  
  @Output() toastVisibilityToggled = new EventEmitter<boolean>();
  visible: boolean = false;
  message?: string | null | undefined = "placeholder";
  toast: Toast | null = null;

  constructor(
    private toastService: ToastService
  ) {
    super();
    this.toastService.toastShown.subscribe((t: Toast) => {
      this.showToast(t);
      // setTimeout(() => {
      //   this.hideToast();
      // }, 2000);
    });

    toastService.toastHidden.subscribe(() => {
      this.hideToast();
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  showToast(toast: Toast) {
    this.toast = toast;
    this.message = toast.message;
    this.visible = true;
    this.toastVisibilityToggled.emit(true);
  }

  hideToast() {
    this.toast = null;
    this.visible = false;
    this.message = null;
    this.toastVisibilityToggled.emit(false);
  }
}
