import { Injectable } from '@angular/core';
import ItemUpdatedNotifierHub from '../hubs/item-updated-notifier.hub';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { WebApiHttpError } from '../errors/web-api-http-error.error';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  // private sub: Subscription | null = null;
  // private message: string | null = null;
  private itemUpdatedNotifier = new Subject<any>();

  constructor(private itemUpdatedNotifierHub: ItemUpdatedNotifierHub) {

    this.itemUpdatedNotifierHub.ItemUpdatedNotifier().subscribe(message => {
      // this.message = message;
      this.itemUpdatedNotifier.next(message);
      // this.ItemUpdatedNotifier();
    });

    this.itemUpdatedNotifierHub.start();
  }

  public ItemUpdatedNotifier(): Observable<string>  {
    console.log("message");
    return this.itemUpdatedNotifier.asObservable();
    // return of(this.message!).asObservable();
  }

}
