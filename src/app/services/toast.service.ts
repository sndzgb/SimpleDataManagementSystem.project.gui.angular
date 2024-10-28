import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastType } from '../constants/toast-type';
export interface Toast {
  message: string;
  type: ToastType;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService { //implements OnDestroy

  private toastShownSubject = new Subject<Toast>();
  toastShown = this.toastShownSubject.asObservable();
  private toastHiddenSubject = new Subject();
  toastHidden = this.toastHiddenSubject.asObservable();

  constructor() { 

  }

  show(message: string, type: ToastType = ToastType.default) {
    this.toastShownSubject.next({ message: message, type: type });
  }

  hide() {
    this.toastHiddenSubject.next(null);
  }
}
