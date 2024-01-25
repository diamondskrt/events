import { EventCollection } from '@/components/shared/event-collection';
import { Button } from '@/components/ui/button';
import { getEventsByUser } from '@/lib/actions/event.actions';
import { getOrdersByUser } from '@/lib/actions/order.actions';
import { IOrder } from '@/lib/database/models/order.model';
import { Pagination, SearchParamProps } from '@/types';
import { auth } from '@clerk/nextjs';
import { PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

interface ProfileProps extends SearchParamProps {}

export default async function Profile({ searchParams }: ProfileProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const pagination: Pagination = {
    page: Number(searchParams?.page) || 1,
    limit: 6,
    totalPages: null,
  };

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage });

  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
  const organizedEvents = await getEventsByUser({ userId, page: eventsPage });

  return (
    <section>
      <div className="flex flex-col gap-6 container py-4">
        <div className="prose lg:prose-xl dark:prose-invert max-w-none">
          <h3 className="text-center sm:text-left">My Tickets</h3>
        </div>

        <EventCollection
          events={orderedEvents}
          collectionType="My_Tickets"
          pagination={pagination}
        />
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

        <EventCollection
          events={organizedEvents?.data}
          collectionType="Events_Organized"
          pagination={pagination}
        />
      </div>
    </section>
  );
}
