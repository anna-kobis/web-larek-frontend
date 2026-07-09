export interface ISuccessActions {
  onClick: (event: MouseEvent) => void;
}

export interface ISuccessData {
  total: number;
}

export interface ISuccessViewConstructor {
  new (container: HTMLElement, actions: ISuccessActions): ISuccessView;
}

export interface ISuccessView {
  set total(total: number);
}
