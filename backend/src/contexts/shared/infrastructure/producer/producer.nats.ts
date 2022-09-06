import { injectable } from "inversify";
import { connect, NatsConnection, Subscription, JSONCodec } from "nats";

const NATS_SERVER_URL = process.env.NATS_SERVER_URL || "127.0.0.1:4222";

@injectable()
export class NatsProducer<E, T> {
  nc: NatsConnection | null = null;
  conencted = false;
  codec = JSONCodec();

  async connect() {
    this.nc = await connect({ servers: NATS_SERVER_URL });
    this.conencted = true;
    console.log(`[NATS][Producer] connected`);
  }

  pub(eventName: E, data: T) {
    if (typeof eventName !== "string") {
      console.log(`[NATS][PUBLISH][${eventName}] Not string`);
      return;
    }

    console.log(`[NATS][PUBLISH][${eventName}] ${JSON.stringify(data)}`);
    this.nc?.publish(eventName, this.codec.encode(data));
  }
}
