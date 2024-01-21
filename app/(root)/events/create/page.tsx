import { EventForm } from '@/components/shared/event-form';
import { EventFormTypes } from '@/components/shared/event-form/model';
import { auth } from '@clerk/nextjs';

export default function CreateEvent() {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <section>
      <div className="flex flex-col gap-6 container py-4">
        <div className="prose lg:prose-xl dark:prose-invert max-w-none">
          <h3 className="text-center sm:text-left">Create Event</h3>
        </div>

        <EventForm
          userId={userId}
          type={EventFormTypes.CREATE}
          className="w-full sm:w-[450px]"
        />
      </div>
    </section>
  );
}
