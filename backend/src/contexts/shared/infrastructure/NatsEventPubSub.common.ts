import { IEventPubSub } from "./eventEmiterPubSub.interface";

import { connect, NatsConnection, Subscription, JSONCodec } from "nats";

class NatsEventPubSub implements IEventPubSub {
  private natsConnection: NatsConnection | undefined;
  private subscriptions = new Array<Subscription>();
  private connected = false;

  async connect() {
    this.natsConnection = await connect({ servers: "demo.nats.io:4222" });
    this.connected = true;
  }
  sub(eventName: string, callback: (eventName: string, data: any) => void) {
    console.log(`[NatsEventPubSub][SUB][event=${eventName}]`);
    const sub = this.natsConnection?.subscribe(eventName);

    if (sub) {
      this.subscriptions.push(sub);
      const jsonCodec = JSONCodec();

      (async () => {
        for await (const m of sub) {
          console.log(`[${sub.getProcessed()}]: ${jsonCodec.decode(m.data)}`);
        }
        console.log("subscription closed");
      })();
    }
  }

  pub(eventName: string, data: any) {
    console.log(`[NatsEventPubSub][PUB][event=${eventName}]`);
    console.log(data);

    // this.emit(eventName, data);
  }
}

// TODO: Singleton replace with nat or rabbitMQ or etc.
const natsEventPubSub = new NatsEventPubSub();
export default natsEventPubSub;
