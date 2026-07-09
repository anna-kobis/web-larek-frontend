import { ensureElement, formatPrice } from '../../utils/utils';
import {
  ISuccessActions,
  ISuccessData,
  ISuccessView,
} from '../../types/view/Success';
import { View } from '../base/view';

export class SuccessView extends View<ISuccessData> implements ISuccessView {
  protected _closeButton: HTMLButtonElement;
  protected _total: HTMLElement;

  constructor(container: HTMLElement, actions: ISuccessActions) {
    super(container);

    this._closeButton = ensureElement<HTMLButtonElement>(
      '.order-success__close',
      container
    );

    this._total = ensureElement<HTMLElement>(
      '.order-success__description',
      container
    );

    if (actions?.onClick) {
      this._closeButton.addEventListener('click', actions.onClick);
    }
  }

  set total(total: number) {
    this.setTextContent(this._total, `Списано ${formatPrice(total)} синапсов`);
  }
}
