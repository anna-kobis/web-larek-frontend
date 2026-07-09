import { IEvents } from '../../types/base/events';
import { IContactsData, IContactsView } from '../../types/view/Contacts';
import { FormView } from './Form';

export class ContactsView
  extends FormView<IContactsData>
  implements IContactsView
{
  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
  }

  set email(email: string) {
    (this.container.elements.namedItem('email') as HTMLInputElement).value =
      email;
  }

  set phone(phone: string) {
    (this.container.elements.namedItem('phone') as HTMLInputElement).value =
      phone;
  }
}
