import { ensureElement } from '../../utils/utils';
import { IEvents } from '../../types/base/events';
import { IPageData, IPageView } from '../../types/view/Page';
import { View } from '../base/view';

export class PageView extends View<IPageData> implements IPageView {
  protected _basketCounter: HTMLElement;
  protected _productsList: HTMLElement;
  protected _wrapper: HTMLElement;
  protected _basket: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents
  ) {
    super(container);
    this._basketCounter = ensureElement<HTMLElement>('.header__basket-counter');
    this._productsList = ensureElement<HTMLElement>('.gallery');
    this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
    this._basket = ensureElement<HTMLButtonElement>('.header__basket');

    this._basket.addEventListener('click', () => {
      this.events.emit('basket:open');
    });
  }

  set basketCounter(value: number) {
    this.setTextContent(this._basketCounter, String(value));
  }

  set productsList(items: HTMLElement[]) {
    this._productsList.replaceChildren(...items);
  }

  set locked(state: boolean) {
    this.toggleClass(this._wrapper, 'page__wrapper_locked', state);
  }
}
