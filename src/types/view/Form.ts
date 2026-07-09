import { IEvents } from '../base/events';

export interface IFormData {
  isValid: boolean;
  errors: string[];
}

export interface IFormViewConstructor<T> {
  new (container: HTMLFormElement, events: IEvents): IFormView<T>;
}

export interface IFormView<T> {
  set isValid(state: boolean);
  set errors(errors: string);
  clearForm(): void;
  render(state: Partial<T> & IFormData): HTMLFormElement;
}
