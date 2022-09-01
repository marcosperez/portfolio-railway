import EventEmitter from "events";
import { IEventPubSub } from "./eventEmiterPubSub.interface";

class BasicEventPubSub extends EventEmitter implements IEventPubSub {
  sub(eventName: string, callback: (eventName: string, data: any) => void) {
    this.on(eventName, (data: any) => {
      console.log(`[BasicEventPubSub][SUB][event=${eventName}]`);
      console.log(data);
      callback(eventName, data);
    });
  }

  pub(eventName: string, data: any) {
    console.log(`[BasicEventPubSub][PUB][event=${eventName}]`);
    console.log(data);

    this.emit(eventName, data);
  }
}

// TODO: Singleton replace with nat or rabbitMQ or etc.
const basicEventPubSub = new BasicEventPubSub();
export default basicEventPubSub;
