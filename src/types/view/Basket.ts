import { IEvents } from '../base/events';

export interface IBasketData {
  items: HTMLElement[];
  total: number;
}

export interface IBasketViewConstructor {
  new (container: HTMLElement, events: IEvents): IBasketView;
}

export interface IBasketView {
  set items(items: HTMLElement[]);
  set total(total: number);
}
