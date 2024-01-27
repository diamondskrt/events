import { IEvent } from '@/lib/database/models/event.model';
import { Pagination } from '@/types';

export interface EventCardProps {
  event: IEvent;
}

export interface EventCollectionProps {
  events: IEvent[];
  pagination?: Pagination;
}

export interface EventPaginationProps {
  totalPages: number;
}
