'use client';

import { Button } from '@/components/ui/button';
import { IEvent } from '@/lib/database/models/event.model';
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { isBefore } from 'date-fns';
import Link from 'next/link';
import { Checkout } from './Checkout';

interface CheckoutBtnProps {
  event: IEvent;
}

export default function CheckoutBtn({ event }: CheckoutBtnProps) {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  const isFinishedEvent = isBefore(event.endDateTime, new Date());

  return (
    <div className="ok lets go">
      {isFinishedEvent ? (
        <p>tickets are no longer available</p>
      ) : (
        <>
          <SignedOut>
            <Link href="/sign-in">
              <Button>Get Tickets</Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
}
