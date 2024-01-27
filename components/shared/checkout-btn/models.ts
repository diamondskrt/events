import { IEvent } from '@/lib/database/models/event.model';

export interface CheckoutBtnProps {
  event: IEvent;
}

export interface CheckoutProps {
  event: IEvent;
  userId: string;
}
