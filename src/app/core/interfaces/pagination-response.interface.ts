import { EventModel } from '../models/event.model';

export class PaginationResponseInterface<T> {
  data!: T;
  pages!: number;
  first!: number;
  prev!: number;
  next!: number;
  last!: number;
  items!: number;

  public constructor(
    fields?: Partial<EventModel>) {

    if (fields) {
      Object.assign(this, fields);
    }
  }
}
