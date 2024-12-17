export default class HubNotification {

    constructor() {
        this.id = new Date().getTime().toString();
    }

    readonly id: string;
    message: string | null = null;
}