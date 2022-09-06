export interface IProducer<E, T> {
  pub: (eventName: E, data: T) => void;
  connect(): Promise<void>;
}
