import { IEvents } from '../base/events';

export interface IModalData {
  content: HTMLElement;
}

export interface IModalViewConstructor {
  new (container: HTMLElement, events: IEvents): IModalView;
}

export interface IModalView {
  set content(content: HTMLElement | null);
  open(): void;
  close(): void;
  render(data: IModalData): HTMLElement;
}
