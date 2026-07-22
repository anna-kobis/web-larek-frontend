import { ensureElement } from '../../utils/utils';
import { IEvents } from '../../types/base/events';
import { IModalData, IModalView } from '../../types/view/Modal';
import { View } from '../base/view';

export class ModalView extends View<IModalData> implements IModalView {
  protected _closeButton: HTMLButtonElement;
  protected _content: HTMLElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents
  ) {
    super(container);

    this._closeButton = ensureElement<HTMLButtonElement>(
      '.modal__close',
      container
    );

    this._content = ensureElement<HTMLElement>('.modal__content', container);
    this._closeButton.addEventListener('click', this.close.bind(this));
    this.container.addEventListener('click', this.close.bind(this));
    this._content.addEventListener('click', (evt) => evt.stopPropagation());
  }

  set content(content: HTMLElement | null) {
    if (content) this._content.replaceChildren(content);
    else this._content.replaceChildren();
  }

  open(): void {
    this.container.classList.add('modal_active');
    this.events.emit('modal:open');
  }

  close(): void {
    this.container.classList.remove('modal_active');
    this.content = null;
    this.events.emit('modal:close');
  }

  render(data: IModalData): HTMLElement {
    super.render(data);
    this.open();
    return this.container;
  }
}
