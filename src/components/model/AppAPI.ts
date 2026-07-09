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
    return this.get('/product').then((data: ApiListResponse<IProduct>) =>
      data.items.map((item) => ({
        ...item,
        image: this.imageUrl + item.image,
      }))
    );
  }

  getProductItem(id: string): Promise<IProduct> {
    return this.get(`/product/${id}`).then((item: IProduct) => ({
      ...item,
      image: this.imageUrl + item.image,
    }));
  }

  postOrder(order: IOrder): Promise<IOrderResult> {
    return this.post('/order', order).then((data: IOrderResult) => data);
  }
}
