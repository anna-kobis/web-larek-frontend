import { IProduct, IOrder, IOrderResult } from './AppModel';

export interface IAppAPIConstructor {
  new (imageUrl: string, baseUrl: string, options?: RequestInit): IAppAPI;
}

export interface IAppAPI {
  readonly imageUrl: string;

  getProductsList(): Promise<IProduct[]>;
  getProductItem(id: string): Promise<IProduct>;
  postOrder(order: IOrder): Promise<IOrderResult>;
}
