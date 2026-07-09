import { ICategory } from '../model/AppModel';
import { ICardActions } from './Card';

export interface ICardPreviewData {
  id: string;
  title: string;
  description: string;
  image: string;
  category: ICategory;
  price: number | null;
  isInBasket: boolean;
}

export interface ICardPreviewViewConstructor {
  new (container: HTMLElement, actions?: ICardActions): ICardPreviewView;
}

export interface ICardPreviewView {
  set description(description: string);
  set price(price: number | null);
  set isInBasket(state: boolean);
}
