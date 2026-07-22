import { IModel } from '../../types/base/model';
import { IEvents } from '../../types/base/events';

export abstract class Model<T> implements IModel {
  constructor(
    data: Partial<T>,
    protected events: IEvents
  ) {
    Object.assign(this, data);
  }

  emitChanges(event: string, payload?: object): void {
    this.events.emit(event, payload ?? {});
  }
}
