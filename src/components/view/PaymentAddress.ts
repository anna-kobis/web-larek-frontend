import { ensureAllElements } from '../../utils/utils';
import { IEvents } from '../../types/base/events';
import {
  IPaymentAddressData,
  IPaymentAddressView,
} from '../../types/view/PaymentAddress';
import { FormView } from './Form';

export class PaymentAddressView
  extends FormView<IPaymentAddressData>
  implements IPaymentAddressView
{
  protected _paymentButtons: HTMLButtonElement[];

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this._paymentButtons = ensureAllElements<HTMLButtonElement>(
      '.button_alt',
      container
    );

    this._paymentButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this.payment = button.name;
        this.onInputChange('payment', button.name);
      });
    });
  }

  set payment(payment: string) {
    this._paymentButtons.forEach((button) => {
      this.toggleClass(button, 'button_alt-active', button.name === payment);
    });
  }

  set address(address: string) {
    (this.container.elements.namedItem('address') as HTMLInputElement).value =
      address;
  }

  clearForm(): void {
    super.clearForm();
    this.payment = '';
  }
}
