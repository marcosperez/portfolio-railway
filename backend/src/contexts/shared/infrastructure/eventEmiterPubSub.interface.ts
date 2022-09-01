export interface IEventPubSub {
  sub(
    eventName: string,
    callback: (eventName: string, data: any) => void
  ): void;
  pub(eventName: string, data: any): void;
}
