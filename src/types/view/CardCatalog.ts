import { ICategory } from '../model/AppModel';
import { ICardActions } from './Card';

export type ICategoryNames = Record<ICategory, string>;

export interface ICardCatalogData {
  id: string;
  title: string;
  image: string;
  category: ICategory;
  price: number | null;
}

export interface ICardCatalogViewConstructor {
  new (container: HTMLElement, actions?: ICardActions): ICardCatalogView;
}

export interface ICardCatalogView {
  set image(src: string);
  set category(category: ICategory);
}
