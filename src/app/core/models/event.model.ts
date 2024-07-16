import { PriorityEnum } from '../enums/priority.enum';
import { StatusEnum } from '../enums/status.enum';

export class EventModel {
  id!: string;
  title!: string;
  description!: string;
  date!: string;
  priority!: PriorityEnum;
  status!: StatusEnum;

  public constructor(
    fields?: Partial<EventModel>) {

    if (fields) {
      Object.assign(this, fields);
    }
  }
}
