import {
  IProduct,
  IOrderForm,
  IFormErrors,
  IAppData,
  IAppModel,
} from '../../types/model/AppModel';
import { Model } from '../base/model';

export class AppModel extends Model<IAppData> implements IAppModel {
  productList: IProduct[];
  preview: string | null;
  order: Partial<IOrderForm> = {};
  formErrors: IFormErrors;

  setProductList(items: IProduct[]): void {
    this.productList = items;
    this.emitChanges('products:change', { productList: this.productList });
  }

  setPreviewProduct(item: IProduct): void {
    this.preview = item.id;
    this.emitChanges('preview:change', item);
  }

  addProductToBasket(item: IProduct): void {
    item.isInBasket = true;
    this.emitChanges('backet:change', this.getBasketItems());
  }

  removeProductFromBasket(item: IProduct): void {
    item.isInBasket = false;
    this.emitChanges('backet:change');
  }

  getBasketItems(): IProduct[] {
    return this.productList.filter((item) => item.isInBasket);
  }

  getTotalPrice(): number {
    return this.getBasketItems().reduce((sum, item) => sum + item.price, 0);
  }

  setOrderField<T extends keyof IOrderForm>(
    field: T,
    value: IOrderForm[T]
  ): void {
    this.order[field] = value;
    this.validateOrder();
  }

  validateOrder(): boolean {
    const errors: typeof this.formErrors = {};

    if (!this.order.payment) {
      errors.payment = 'Необходимо указать способ оплаты.';
    }

    if (!this.order.address) {
      errors.address = 'Необходимо указать адрес доставки.';
    }

    if (!this.order.email) {
      errors.email = 'Необходимо указать email.';
    }

    if (!this.order.phone) {
      errors.phone = 'Необходимо указать телефон.';
    }

    this.formErrors = errors;
    this.events.emit('formErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }

  clearBasket(): void {
    this.productList.forEach((item) => (item.isInBasket = false));
    this.emitChanges('backet:change');
  }

  clearOrder(): void {
    this.order = {};
  }
}
