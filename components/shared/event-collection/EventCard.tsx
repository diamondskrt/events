import { format, parseISO } from 'date-fns';
import { auth } from '@clerk/nextjs';
import {
  CalendarIcon,
  ExternalLinkIcon,
  GlobeIcon,
  Pencil1Icon,
} from '@radix-ui/react-icons';

import Link from 'next/link';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

import RemoveEvent from './RemoveEvent';
import { EventCardProps } from './model';

export function EventCard({ event }: EventCardProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === String(event.organizer._id);

  return (
    <Card className="relative h-full">
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
              <small>{format(parseISO(event.startDateTime), 'Pp')}</small>
            </div>
            <small>
              by&nbsp;
              <span className="text-primary">
                {event.organizer.firstName} {event.organizer.lastName}
              </span>
            </small>
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
        <div className="pb-[60px]">
          <p className="line-clamp-3">{event.description}</p>
        </div>
      </CardContent>
      <CardFooter className="absolute w-full bottom-0">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2">
            <Button size="xs" className="rounded-full">
              {event.isFree ? 'FREE' : `$ ${event.price}`}
            </Button>
            <Button size="xs" className="rounded-full">
              {event.category.name}
            </Button>
          </div>
          {isEventCreator && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`/orders?eventId=${event._id}`}>
                    <Button size="icon" variant="ghost">
                      <ExternalLinkIcon />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Check Orders</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
