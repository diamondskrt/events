import { PlusIcon } from '@radix-ui/react-icons';
import { auth } from '@clerk/nextjs';

import Link from 'next/link';

import { EventCollection } from '@/components/shared/event-collection';
import { Button } from '@/components/ui/button';
import { getEventsByUser } from '@/lib/actions/event.actions';
import { getOrdersByUser } from '@/lib/actions/order.actions';
import { IOrder } from '@/lib/database/models/order.model';

export default async function Profile() {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const orders = await getOrdersByUser({ userId, page: 1 });

  const orderedEvents =
    orders?.data.map((order: IOrder) => order.event).filter(Boolean) || [];

  const organizedEvents = await getEventsByUser({
    userId,
    page: 1,
  });

  return (
    <section>
      <div className="flex flex-col gap-6 container py-4">
        <div className="prose lg:prose-xl dark:prose-invert max-w-none">
          <h3 className="text-center sm:text-left">My Tickets</h3>
        </div>

        <EventCollection events={orderedEvents} />
      </div>

      <div className="flex flex-col gap-6 container py-4">
        <div className="prose lg:prose-xl dark:prose-invert max-w-none">
          <h3 className="text-center sm:text-left">Events Organized</h3>
        </div>

        <Link href="/events/create">
          <Button variant="ghost">
            <PlusIcon />
            <span className="ml-2">Create New Event</span>
          </Button>
        </Link>

        <EventCollection events={organizedEvents?.data} />
      </div>
    </section>
  );
}
