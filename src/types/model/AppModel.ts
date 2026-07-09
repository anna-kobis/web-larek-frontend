export interface IProduct {
  id: string;
  title: string;
  description: string;
  image: string;
  category: ICategory;
  price: number | null;
  isInBasket: boolean;
}

export type ICategory =
  | 'хард-скил'
  | 'софт-скил'
  | 'кнопка'
  | 'дополнительное'
  | 'другое';

export interface IPaymentAddressForm {
  payment: 'card' | 'cash' | '';
  address: string;
}

export interface IContactsForm {
  email: string;
  phone: string;
}

export type IOrderForm = IPaymentAddressForm & IContactsForm;

export interface IOrder extends IOrderForm {
  items: string[];
  total: number;
}

export interface IOrderResult {
  id: string;
  total: number;
}

export type IFormErrors = Partial<Record<keyof IOrderForm, string>>;

export interface IAppData {
  productList: IProduct[];
  preview: string | null;
  order: IOrderForm;
}

export interface IAppModel {
  productList: IProduct[];
  preview: string | null;
  order: Partial<IOrderForm>;
  formErrors: IFormErrors;

  setProductList(items: IProduct[]): void;
  setPreviewProduct(item: IProduct): void;
  addProductToBasket(item: IProduct): void;
  removeProductFromBasket(item: IProduct): void;
  getBasketItems(): IProduct[];
  getTotalPrice(): number;

  setOrderField<T extends keyof IOrderForm>(
    field: T,
    value: IOrderForm[T]
  ): void;

  validateOrder(): boolean;
  clearBasket(): void;
  clearOrder(): void;
}
