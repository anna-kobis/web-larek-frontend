export interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export interface ICardData {
  id: string;
  title: string;
  price: number;
}

export interface ICardViewConstructor {
  new (container: HTMLElement): ICardView;
}

export interface ICardView {
  set id(id: string);
  get id(): string;
  set title(title: string);
  get title(): string;
  set price(price: number | null);
  get price(): number | null;
}
