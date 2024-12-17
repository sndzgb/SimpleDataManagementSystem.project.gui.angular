import { Component, NgModuleFactory, OnInit } from '@angular/core';
import { NonRoutableComponent } from '../base/non-routable/non-routable.component';
import { NotificationsService } from 'src/app/services/notifications.service';
import HubNotification from 'src/app/models/hub-notification.model';

@Component({
  selector: 'notifications-sidebar',
  templateUrl: './notifications-sidebar.component.html',
  styleUrls: ['./notifications-sidebar.component.css']
})
export class NotificationsSidebarComponent extends NonRoutableComponent implements OnInit {

  public notifications: HubNotification[];


  constructor(private notificationsService: NotificationsService) {
    super();

    this.notifications = new Array<HubNotification>();

    this.notificationsService.ItemUpdatedNotifier().subscribe({
      complete: () => { 
      },
      error: (error: any) => { 
        console.error(error);
      },
      next: (data) => {
        this.addNotification(data);
        this.addNewNotificationAnimation();
      }
    });
  }


  override ngOnInit(): void {
    super.ngOnInit();
  }


  public addNotification(notification: string): void {
    var note = new HubNotification();
    note.message = notification;
    this.notifications?.push(note);
  }

  protected onRemoveNotification(notificationId: string) {
    let note: HubNotification | undefined = this.notifications?.find(x => x.id == notificationId);

    if (note) {
      const index = this.notifications?.indexOf(note!, 0);
      if (index! > -1) {
        this.notifications!.splice(index!, 1);
      }
    }
  }


  public isCollapsed: boolean = true;

  public onToggleNotificationsSidebarClicked($event: any): void {
    this.isCollapsed = !this.isCollapsed;
    this.removeNewNotificationAnimation();
  }


  private addNewNotificationAnimation(): void {
    document.getElementsByClassName('notifications-sidebar')[0].classList.add('notifications-collapsible-toggler');
  }

  private removeNewNotificationAnimation(): void {
    document.getElementsByClassName('notifications-sidebar')[0].classList.remove('notifications-collapsible-toggler');
  }

}
