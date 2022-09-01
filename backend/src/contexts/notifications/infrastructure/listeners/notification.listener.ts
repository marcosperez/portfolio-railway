import { inject, injectable } from "inversify";
import basicEventPubSub from "../../../shared/infrastructure/BasicEventPubSub.common";
import { RegisterAccessLogs } from "../../application/services/RegisterAccessLogs.service";
import { NotificationsServicesTypes } from "../../application/services/notifications.services";
import { INotificationListener } from "./notification.listener.interface";

@injectable()
export class NotificationListener implements INotificationListener {
  constructor(
    @inject(NotificationsServicesTypes.RegisterAccessLogs)
    private registerAccessLogs: RegisterAccessLogs
  ) {}
  start() {
    console.log(`[NotificationListener] Start... 🔊`);
    basicEventPubSub.on(
      "LoginEvent",
      this.registerAccessLogs.execute.bind(this.registerAccessLogs)
    );
  }
}
