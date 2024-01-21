import Image from 'next/image';
import {
  getEventById,
  getRelatedEventsByCategory,
} from '@/lib/actions/event.actions';
import { Button } from '@/components/ui/button';
import { format, isSameDay } from 'date-fns';
import { CalendarIcon, GlobeIcon } from '@radix-ui/react-icons';
import { Pagination, SearchParamProps } from '@/types';
import { EventCollection } from '@/components/shared/event-collection';

interface EventDetailsProps extends SearchParamProps {
  params: {
    id: string;
  };
}

export default async function EventDetails({
  params,
  searchParams,
}: EventDetailsProps) {
  const pagination: Pagination = {
    page: Number(searchParams?.page) || 1,
    limit: 6,
    totalPages: null,
  };

  const event = await getEventById(params.id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: String(pagination.page),
  });

  pagination.totalPages = relatedEvents?.totalPages;

  const getDateInterval = (startDateTime: Date, endDateTime: Date) => {
    const endDate = isSameDay(startDateTime, endDateTime)
      ? format(endDateTime, 'hh:mm a')
      : format(endDateTime, 'Pp');
    return `${format(startDateTime, 'Pp')} - ${endDate}`;
  };

  return (
    <section>
      <div className="flex flex-col gap-6 container py-4">
        <div className="prose lg:prose-xl dark:prose-invert max-w-none">
          <h3 className="text-center sm:text-left">Event Details</h3>
        </div>

        <div className="flex flex-col gap-4">
          <Image
            src={event.imageUrl}
            alt="hero image"
            width={500}
            height={500}
            className="h-full min-h-[300px] object-cover object-center"
          />
          <h3>{event.title}</h3>
          <div className="flex gap-2">
            <Button size="xs" className="rounded-full">
              {event.isFree ? 'FREE' : `$ ${event.price}`}
            </Button>
            <Button size="xs" className="rounded-full">
              {event.category.name}
            </Button>
          </div>
          <p>
            by&nbsp;
            <span className="text-primary">
              {event.organizer.firstName} {event.organizer.lastName}
            </span>
          </p>
          <div className="flex items-center gap-4">
            <CalendarIcon />
            <p>{getDateInterval(event.startDateTime, event.endDateTime)}</p>
          </div>
          <div className="flex items-center gap-4">
            <GlobeIcon />
            <p>{event.location}</p>
          </div>
          <p>{event.description}</p>
          <a href={event.url} target="_blank" className="text-primary">
            {event.url}
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-6 container py-4">
        <div className="prose lg:prose-xl dark:prose-invert max-w-none">
          <h3 className="text-center sm:text-left">Related Events</h3>
        </div>

        <EventCollection
          events={relatedEvents?.data}
          collectionType="Related_Events"
          pagination={pagination}
        />
      </div>
    </section>
  );
}
