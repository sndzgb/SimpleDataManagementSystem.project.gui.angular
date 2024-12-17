import { inject, Injectable } from "@angular/core";
import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { Observable, Subject } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export default class ItemUpdatedNotifierHub {

    private itemUpdatedNotifier = new Subject<any>();
    private client: HubConnection;
    authService: AuthService = inject(AuthService);
    private token: string | undefined;

    constructor(private authenticationService: AuthService) {

        this.client = new HubConnectionBuilder()
            .withUrl("https://localhost:7006/hubs/itemUpdatedNotifier", {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets,
                accessTokenFactory: () => {
                    return this.authenticationService.getAuthenticationToken()!
                    // return this.token!;
                }
            })
            .configureLogging(LogLevel.Trace)
            .withAutomaticReconnect()
            .build();

        this.client.on("ItemUpdatedNotifierSender", message => {
            this.itemUpdatedNotifier.next(message);
        });

        this.client.onclose(error => {
            console.error(error);
        });
    }

    public ItemUpdatedNotifier(): Observable<string> {
        return this.itemUpdatedNotifier.asObservable();
    }

    public start() {
        this.client
            .start()
            .then(() => console.log('Connection started'))
            .catch(err => console.log('Error while starting connection: ' + err));
    }
}