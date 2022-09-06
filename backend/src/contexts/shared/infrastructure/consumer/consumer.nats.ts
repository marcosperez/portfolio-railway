import { injectable } from "inversify";
import { connect, NatsConnection, Subscription, JSONCodec } from "nats";
import { IConsumer } from "./consumer.interface";

const NATS_SERVER_URL = process.env.NATS_SERVER_URL || "127.0.0.1:4222";

@injectable()
export class NatsConsumer<E, T> implements IConsumer<E, T> {
  nc: NatsConnection | null = null;
  conencted = false;
  codec = JSONCodec();
  subscriptions = new Map<number, Subscription>();

  async connect() {
    this.nc = await connect({ servers: NATS_SERVER_URL });
    this.conencted = true;
    console.log(`[NATS][Consumer] connected`);
  }

  sub(eventName: E, callback: (data: T) => void) {
    if (typeof eventName !== "string") {
      console.log(`[NATS][SUBSCRIBE][${eventName}] Not string`);
      return -1;
    }

    if (!this.nc) {
      console.log(`[NATS][SUBSCRIBE][${eventName}] Not init`);
      return -1;
    }

    const sub = this.nc.subscribe(eventName);
    this.subscriptions.set(sub.getID(), sub);

    this.loop(sub, callback);

    return sub.getID();
  }

  unsuscribe(id: number) {
    const sub = this.subscriptions.get(id);
    if (sub) {
      console.log("subscription closed");
    }
  }

  private async loop(sub: Subscription, callback: (data: T) => void) {
    for await (const m of sub) {
      const data = this.codec.decode(m.data) as T;
      console.log(
        `[NATS][SUBSCRIBE][${sub.getProcessed()}]: ${JSON.stringify(data)}`
      );
      await callback(data);
    }
    console.log("[NATS][SUBSCRIBE] closed");
  }
}
