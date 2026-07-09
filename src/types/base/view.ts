export interface IViewConstructor<T> {
  new (container: HTMLElement): IView<T>;
}

export interface IView<T> {
  toggleClass(element: HTMLElement, className: string, state?: boolean): void;
  setDisabled(element: HTMLElement, state: boolean): void;
  render(data?: Partial<T>): HTMLElement;
}
