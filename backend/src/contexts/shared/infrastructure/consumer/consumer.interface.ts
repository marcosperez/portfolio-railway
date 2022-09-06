export interface IConsumer<E, T> {
  sub: (eventName: E, callback: (data: T) => void) => number;
  connect(): Promise<void>;
}
