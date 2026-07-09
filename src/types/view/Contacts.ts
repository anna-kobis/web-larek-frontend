import { IEvents } from '../base/events';
import { IContactsForm } from '../model/AppModel';

export type IContactsData = IContactsForm;

export interface IContactsViewConstructor {
  new (container: HTMLFormElement, events: IEvents): IContactsView;
}

export interface IContactsView {
  set email(email: string);
  set phone(phone: string);
}
