import { IEvent } from '@/lib/database/models/event.model';
import { Pagination } from '@/types';
import { EventCard } from './EventCard';

interface EventCollectionProps {
  events: IEvent[];
  collectionType: string;
  pagination: Pagination;
}

export default async function EventCollection({
  events,
}: EventCollectionProps) {
  return (
    <>
      {events?.length ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 xl:gap-6">
          {events.map((event) => (
            <div key={event._id}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      ) : (
        <>
          <p>No Events Found</p>
        </>
      )}
    </>
  );
}
