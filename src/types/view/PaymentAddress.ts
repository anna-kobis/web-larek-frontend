import { IEvents } from '../base/events';
import { IPaymentAddressForm } from '../model/AppModel';

export type IPaymentAddressData = IPaymentAddressForm;

export interface IPaymentAddressViewConstructor {
  new (container: HTMLFormElement, events: IEvents): IPaymentAddressView;
}

export interface IPaymentAddressView {
  set payment(payment: string);
  set address(address: string);
  clearForm(): void;
}
