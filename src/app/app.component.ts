import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastService } from './services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy { // TODO extends RoutableComponent


  toastVisible: boolean = false;
  internalVisible: boolean = true;
  private toastShownSubscription: Subscription | null = null;
  private toastHiddenSubscription: Subscription | null = null;

  @ViewChild('adminCredentials') admin!: ElementRef;

  onAdminCredentialsPopupCloseClicked($event: Event) {
    this.admin.nativeElement.remove();
  }

  onToastVisibilityToggled(visible: boolean): void {
    this.toastVisible = visible;
  }

  constructor(public toastService: ToastService) {
    this.toastVisible = false;
  }

  ngOnInit(): void {
    this.toastVisible = false;
  }

  ngOnDestroy(): void {
    this.toastShownSubscription?.unsubscribe();
    this.toastHiddenSubscription?.unsubscribe();
  }
}
