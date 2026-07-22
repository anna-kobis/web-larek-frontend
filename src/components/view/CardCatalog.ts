import { ICategory } from '../../types/model/AppModel';
import { ICardActions } from '../../types/view/Card';
import {
  ICategoryNames,
  ICardCatalogData,
  ICardCatalogView,
} from '../../types/view/CardCatalog';
import { ensureElement } from '../../utils/utils';
import { CardView } from './Card';

export class CardCatalogView<T = ICardCatalogData>
  extends CardView<T>
  implements ICardCatalogView
{
  protected _category: HTMLElement;
  protected _image: HTMLImageElement;

  static categories: ICategoryNames = {
    'хард-скил': 'hard',
    'софт-скил': 'soft',
    кнопка: 'button',
    дополнительное: 'additional',
    другое: 'other',
  };

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    this._category = ensureElement<HTMLElement>('.card__category', container);
    this._image = ensureElement<HTMLImageElement>('.card__image', container);
    if (actions?.onClick) container.addEventListener('click', actions.onClick);
  }

  set image(src: string) {
    this.setImage(this._image, src, this.title);
  }

  set category(category: ICategory) {
    this._category.classList.add(
      `card__category_${CardCatalogView.categories[category]}`
    );

    this.setTextContent(this._category, category);
  }
}
