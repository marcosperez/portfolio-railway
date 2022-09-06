import { IEventPubSub } from "./eventEmiterPubSub.interface";

import { connect, NatsConnection, Subscription, JSONCodec } from "nats";

class NatsEventPubSub implements IEventPubSub {
  private natsConnection: NatsConnection | undefined;
  private subscriptions = new Array<Subscription>();
  private connected = false;
  private processors = [];

  async connect() {
    this.natsConnection = await connect({ servers: "127.0.0.1:4222" });
    this.connected = true;
    console.log("NATS Connected");
  }
  sub(eventName: string, callback: (eventName: string, data: any) => void) {
    console.log(`[NatsEventPubSub][SUB][event=${eventName}]`);
    const sub = this.natsConnection?.subscribe(eventName);

    // if (sub) {
    //   this.subscriptions.push(sub);
    //   const jsonCodec = JSONCodec();
    //   natsEventPubSubProcessor(eventName)
    // }
  }

  pub(eventName: string, data: any) {
    console.log(`[NatsEventPubSub][PUB][event=${eventName}]`);
    console.log(data);

    // this.emit(eventName, data);
  }
}

async function natsEventPubSubProcessor(
  eventName: string,
  sub: Subscription,
  callback: (data: any) => void
) {
  const jsonCodec = JSONCodec();

  for await (const m of sub) {
    console.log(`[natsEventPubSubProcessor][event=${eventName}]`);
    const data = jsonCodec.decode(m.data);
    console.log(`[${sub.getProcessed()}]: ${data}`);
    callback(data);
  }
  console.log("subscription closed");
}

// TODO: Singleton replace with nat or rabbitMQ or etc.
const natsEventPubSub = new NatsEventPubSub();
export default natsEventPubSub;
