import { ensureElement, formatPrice } from '../../utils/utils';
import { ICardData, ICardView } from '../../types/view/Card';
import { View } from '../base/view';

export class CardView<T = ICardData> extends View<T> implements ICardView {
  protected _title: HTMLElement;
  protected _price: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
    this._title = ensureElement<HTMLElement>('.card__title', container);
    this._price = ensureElement<HTMLElement>('.card__price', container);
  }

  set id(id: string) {
    this.container.dataset.id = id;
  }

  get id(): string {
    return this.container.dataset.id || '';
  }

  set title(title: string) {
    this.setTextContent(this._title, title);
  }

  get title(): string {
    return this._title.textContent || '';
  }

  set price(price: number | null) {
    if (price) {
      this.setTextContent(this._price, `${formatPrice(price)} синапсов`);
    } else {
      this.setTextContent(this._price, 'Бесценно');
    }
  }

  get price(): number | null {
    if (this._price.textContent === 'Бесценно') return null;
    return parseInt(this._price.textContent.replace(/\s/g, ''));
  }
}
