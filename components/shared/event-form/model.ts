import { IEvent } from '@/lib/database/models/event.model';

export interface EventFormProps {
  userId: string;
  type: string;
  event?: IEvent;
  eventId?: string;
  className?: string;
}

export enum EventFormTypes {
  CREATE = 'Create',
  UPDATE = 'Update',
}
