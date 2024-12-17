import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NonRoutableComponent } from '../base/non-routable/non-routable.component';
import HubNotification from 'src/app/models/hub-notification.model';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent extends NonRoutableComponent implements OnInit {

  @Input() notification?: HubNotification | null;
  @Output() notificationIdToRemove = new EventEmitter<string>();


  constructor() {
    super();
  }


  override ngOnInit(): void {
    super.ngOnInit();
  }


  removeNotification(notificationId: string): void {
    this.notificationIdToRemove.emit(notificationId);
  }

}
