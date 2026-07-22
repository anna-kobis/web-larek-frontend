import { ensureElement } from '../../utils/utils';
import { IEvents } from '../../types/base/events';
import { IFormData, IFormView } from '../../types/view/Form';
import { View } from '../base/view';

export class FormView<T> extends View<IFormData> implements IFormView<T> {
  protected _submitButton: HTMLButtonElement;
  protected _errors: HTMLElement;

  constructor(
    protected container: HTMLFormElement,
    protected events: IEvents
  ) {
    super(container);

    this._submitButton = ensureElement<HTMLButtonElement>(
      'button[type=submit]',
      container
    );

    this._errors = ensureElement<HTMLElement>('.form__errors', container);

    this.container.addEventListener('input', (evt: Event) => {
      const target = evt.target as HTMLInputElement;
      const field = target.name as keyof T;
      const value = target.value;
      this.onInputChange(field, value);
    });

    this.container.addEventListener('submit', (evt: Event) => {
      evt.preventDefault();
      this.events.emit(`${this.container.name}:submit`);
    });
  }

  protected onInputChange(field: keyof T, value: string): void {
    this.events.emit(`${this.container.name}.${String(field)}:change`, {
      field,
      value,
    });
  }

  set isValid(state: boolean) {
    this.setDisabled(this._submitButton, !state);
  }

  set errors(errors: string) {
    this.setTextContent(this._errors, errors);
  }

  clearForm(): void {
    this.container.reset();
  }

  render(state: Partial<T> & IFormData): HTMLFormElement {
    const { isValid, errors, ...inputs } = state;
    super.render({ isValid, errors });
    Object.assign(this, inputs);
    return this.container;
  }
}
