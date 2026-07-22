import './scss/styles.scss';
import { ensureElement, cloneTemplate } from './utils/utils';
import { API_URL, CDN_URL } from './utils/constants';
import {
  IProduct,
  IOrderForm,
  IFormErrors,
  IOrder,
} from './types/model/AppModel';
import { EventEmitter } from './components/base/events';
import { AppApi } from './components/model/AppAPI';
import { AppModel } from './components/model/AppModel';
import { PageView } from './components/view/Page';
import { CardCatalogView } from './components/view/CardCatalog';
import { CardPreviewView } from './components/view/CardPreview';
import { CardBasketView } from './components/view/CardBasket';
import { BasketView } from './components/view/Basket';
import { PaymentAddressView } from './components/view/PaymentAddress';
import { ContactsView } from './components/view/Contacts';
import { SuccessView } from './components/view/Success';
import { ModalView } from './components/view/Modal';

const api = new AppApi(CDN_URL, API_URL);
const events = new EventEmitter();
const app = new AppModel({}, events);

const cardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const paymentAddressTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const modalElement = ensureElement<HTMLElement>('#modal-container');

const page = new PageView(document.body, events);
const modal = new ModalView(modalElement, events);
const basket = new BasketView(cloneTemplate(basketTemplate), events);

const paymentAddress = new PaymentAddressView(
  cloneTemplate(paymentAddressTemplate),
  events
);

const contacts = new ContactsView(cloneTemplate(contactsTemplate), events);

const success = new SuccessView(cloneTemplate(successTemplate), {
  onClick: () => modal.close(),
});

// events.onAll(({ eventName, data }) => console.log(eventName, data));

events.on('products:change', () => {
  page.productsList = app.productList.map((item) => {
    const card = new CardCatalogView(cloneTemplate(cardTemplate), {
      onClick: () => {
        events.emit('card:select', item);
      },
    });

    return card.render({
      id: item.id,
      title: item.title,
      image: item.image,
      category: item.category,
      price: item.price,
    });
  });

  page.basketCounter = app.getBasketItems().length;
});

events.on('card:select', (item: IProduct) => {
  app.setPreviewProduct(item);
});

events.on('card:add', (item: IProduct) => {
  app.addProductToBasket(item);
});

events.on('card:remove', (item: IProduct) => {
  app.removeProductFromBasket(item);
});

events.on('preview:change', (item: IProduct) => {
  const card = new CardPreviewView(cloneTemplate(cardPreviewTemplate), {
    onClick: () => {
      if (item.isInBasket) events.emit('card:remove', item);
      else events.emit('card:add', item);
    },
  });

  events.on('card:add', () => (card.isInBasket = true));
  events.on('card:remove', () => (card.isInBasket = false));

  modal.render({
    content: card.render({
      id: item.id,
      title: item.title,
      description: item.description,
      image: item.image,
      category: item.category,
      price: item.price,
      isInBasket: item.isInBasket,
    }),
  });
});

events.on('basket:open', () => {
  modal.render({ content: basket.render({ total: app.getTotalPrice() }) });
});

events.on('backet:change', () => {
  page.basketCounter = app.getBasketItems().length;

  basket.items = app.getBasketItems().map((item, index) => {
    const card = new CardBasketView(cloneTemplate(cardBasketTemplate), {
      onClick: () => {
        events.emit('card:remove', item);
      },
    });

    return card.render({
      title: item.title,
      price: item.price ?? undefined,
      index: index + 1,
    });
  });

  basket.render({ total: app.getTotalPrice() });
});

events.on('order:open', () => {
  const isValid = app.formErrors
    ? !app.formErrors.payment && !app.formErrors.address
    : false;

  modal.render({
    content: paymentAddress.render({
      isValid,
      errors: [],
    }),
  });
});

events.on(
  /^(order|contacts)\..*:change/,
  (data: { field: keyof IOrderForm; value: string }) => {
    app.setOrderField(data.field, data.value);
  }
);

events.on('formErrors:change', (errors: IFormErrors) => {
  const { payment, address, email, phone } = errors;
  paymentAddress.isValid = !payment && !address;
  contacts.isValid = !email && !phone;

  paymentAddress.errors = Object.values({ payment, address })
    .filter((i) => !!i)
    .join(' ');

  contacts.errors = Object.values({ email, phone })
    .filter((i) => !!i)
    .join(' ');
});

events.on('order:submit', () => {
  const isValid = !app.formErrors.email && !app.formErrors.phone;

  modal.render({
    content: contacts.render({
      isValid,
      errors: [],
    }),
  });
});

events.on('contacts:submit', () => {
  const order: IOrder = {
    ...(app.order as IOrderForm),
    items: app.getBasketItems().map((item) => item.id),
    total: app.getTotalPrice(),
  };

  api
    .postOrder(order)
    .then((result) => {
      modal.render({ content: success.render({ total: result.total }) });
      app.clearBasket();
      app.clearOrder();
      paymentAddress.clearForm();
      contacts.clearForm();
      app.validateOrder();
    })
    .catch((err) => console.log(err));
});

events.on('modal:open', () => {
  page.locked = true;
});

events.on('modal:close', () => {
  page.locked = false;
});

api
  .getProductsList()
  .then(app.setProductList.bind(app))
  .catch((err) => console.log(err));
