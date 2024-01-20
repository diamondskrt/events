import { EventForm } from '@/components/shared/event-form';
import { EventFormTypes } from '@/components/shared/event-form/model';
import { getEventById } from '@/lib/actions/event.actions';
import { auth } from '@clerk/nextjs';

interface UpdateEventProps {
  params: {
    id: string;
  };
}

export default async function UpdateEvent({ params }: UpdateEventProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const event = await getEventById(params.id);

  return (
    <section>
      <div className="grid gap-6 container py-4">
        <div className="prose lg:prose-xl dark:prose-invert max-w-none">
          <h3 className="text-center sm:text-left">Update Event</h3>
        </div>

        <EventForm
          userId={userId}
          type={EventFormTypes.UPDATE}
          event={event}
          className="w-full sm:w-[450px]"
        />
      </div>
    </section>
  );
}
