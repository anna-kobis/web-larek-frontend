import { IEvents } from './events';

export interface IModelConstructor<T> {
  new (data: Partial<T>, events: IEvents): IModel;
}

export interface IModel {
  emitChanges(event: string, payload?: object): void;
}
