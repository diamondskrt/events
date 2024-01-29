import { format, isSameDay, parseISO } from 'date-fns';
import { CalendarIcon, GlobeIcon } from '@radix-ui/react-icons';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { EventCollection } from '@/components/shared/event-collection';
import { CheckoutBtn } from '@/components/shared/checkout-btn';
import {
  getEventById,
  getRelatedEventsByCategory,
} from '@/lib/actions/event.actions';

import { EventDetailsProps } from './model';

export default async function EventDetails({ params }: EventDetailsProps) {
  const event = await getEventById(params.id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    limit: 3,
    page: 1,
  });

  const getDateInterval = (startDateTime: string, endDateTime: string) => {
    const endDate = isSameDay(parseISO(startDateTime), parseISO(endDateTime))
      ? format(parseISO(endDateTime), 'hh:mm a')
      : format(parseISO(endDateTime), 'Pp');
    return `${format(parseISO(startDateTime), 'Pp')} - ${endDate}`;
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

          <CheckoutBtn event={event} />

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

        <EventCollection events={relatedEvents?.data} />
      </div>
    </section>
  );
}
