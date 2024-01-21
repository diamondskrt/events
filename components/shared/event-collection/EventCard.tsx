import { IEvent } from '@/lib/database/models/event.model';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CalendarIcon, GlobeIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { auth } from '@clerk/nextjs';
import RemoveEvent from './RemoveEvent';

interface EventCardProps {
  event: IEvent;
}

export function EventCard({ event }: EventCardProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event.organizer._id.toString();

  return (
    <Card>
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-center w-full min-h-[250px] flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{event.title}</CardTitle>
            <div className="flex items-center gap-4 mt-2">
              <GlobeIcon />
              <small>{event.location}</small>
            </div>
            <div className="flex items-center gap-4">
              <CalendarIcon />
              <small>{format(event.startDateTime, 'Pp')}</small>
            </div>
          </div>
          {isEventCreator && (
            <div className="flex gap-1">
              <Link href={`/events/${event._id}/update`}>
                <Button size="icon" variant="ghost">
                  <Pencil1Icon />
                </Button>
              </Link>
              <RemoveEvent eventId={event._id} />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3">{event.description}</p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2">
          <Button size="xs" className="rounded-full">
            {event.isFree ? 'FREE' : `$ ${event.price}`}
          </Button>
          <Button size="xs" className="rounded-full">
            {event.category.name}
          </Button>
          <small>
            {event.organizer.firstName} {event.organizer.lastName}
          </small>
        </div>
      </CardFooter>
    </Card>
  );
}
