import { EventCard } from './EventCard';
import { EventPagination } from './EventPagination';
import { EventCollectionProps } from './model';

export default function EventCollection({
  events,
  pagination,
}: EventCollectionProps) {
  return (
    <>
      {events?.length ? (
        <>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event._id}>
                <EventCard event={event} />
              </div>
            ))}
          </div>

          {pagination && pagination.totalPages > 1 && (
            <EventPagination totalPages={pagination.totalPages} />
          )}
        </>
      ) : (
        <>
          <p>No Events Found</p>
        </>
      )}
    </>
  );
}
