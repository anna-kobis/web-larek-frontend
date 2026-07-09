import { ensureElement } from '../../utils/utils';
import { ICardActions } from '../../types/view/Card';
import { ICardBasketData, ICardBasketView } from '../../types/view/CardBasket';
import { CardView } from './Card';

export class CardBasketView
  extends CardView<ICardBasketData>
  implements ICardBasketView
{
  protected _index: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    this._index = ensureElement<HTMLElement>('.basket__item-index', container);
    this._button = ensureElement<HTMLButtonElement>('.card__button', container);

    if (actions?.onClick) {
      this._button.addEventListener('click', actions.onClick);
    }
  }

  set index(index: number) {
    this.setTextContent(this._index, String(index));
  }
}
