import { IView } from '../../types/base/view';

export abstract class View<T> implements IView<T> {
  protected constructor(protected readonly container: HTMLElement) {}

  toggleClass(element: HTMLElement, className: string, state?: boolean): void {
    element.classList.toggle(className, state);
  }

  protected setImage(
    element: HTMLImageElement,
    src: string,
    alt?: string
  ): void {
    if (element) {
      element.src = src;
      if (alt) element.alt = alt;
    }
  }

  protected setTextContent(element: HTMLElement, value: unknown): void {
    if (element) element.textContent = String(value);
  }

  setDisabled(element: HTMLElement, state: boolean): void {
    if (element) {
      if (state) element.setAttribute('disabled', 'disabled');
      else element.removeAttribute('disabled');
    }
  }

  render(data?: Partial<T>): HTMLElement {
    Object.assign(this as object, data ?? {});
    return this.container;
  }
}
