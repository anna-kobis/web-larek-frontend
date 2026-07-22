import { ApiListResponse } from '../../types/base/api';
import { IAppAPI } from '../../types/model/AppAPI';
import { IProduct, IOrder, IOrderResult } from '../../types/model/AppModel';
import { Api } from '../base/api';

export class AppApi extends Api implements IAppAPI {
  readonly imageUrl: string;

  constructor(imageUrl: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.imageUrl = imageUrl;
  }

  getProductsList(): Promise<IProduct[]> {
    return this.get<ApiListResponse<IProduct>>('/product').then((data) =>
      data.items.map((item) => ({
        ...item,
        image: this.imageUrl + item.image,
      }))
    );
  }

  getProductItem(id: string): Promise<IProduct> {
    return this.get<IProduct>(`/product/${id}`).then((item) => ({
      ...item,
      image: this.imageUrl + item.image,
    }));
  }

  postOrder(order: IOrder): Promise<IOrderResult> {
    return this.post<IOrderResult>('/order', order);
  }
}
