export type EventName = string | RegExp;
// eslint-disable-next-line @typescript-eslint/ban-types
export type Subscriber = Function;

export type EmitterEvent = {
  eventName: string;
  data: unknown;
};

export interface IEvents {
  on<T extends object>(event: EventName, callback: (data: T) => void): void;
  emit<T extends object>(event: string, data?: T): void;

  trigger<T extends object>(
    event: string,
    context?: Partial<T>
  ): (data: T) => void;
}

export enum EventsList {
  'products:change',
  'card:select',
  'card:add',
  'card:remove',
  'preview:change',
  'basket:open',
  'backet:change',
  'order:open',
  'order.payment:change',
  'order.address:change',
  'formErrors:change',
  'order:submit',
  'contacts.email:change',
  'contacts.phone:change',
  'contacts:submit',
  'modal:open',
  'modal:close',
}
