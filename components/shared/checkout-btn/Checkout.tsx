import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { checkoutOrder } from '@/lib/actions/order.actions';
import { IEvent } from '@/lib/database/models/event.model';

interface CheckoutProps {
  event: IEvent;
  userId: string;
}

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export function Checkout({ event, userId }: CheckoutProps) {
  const onCheckout = async () => {
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId,
    };

    await checkoutOrder(order);
  };

  return (
    <form action={onCheckout}>
      <Button>{event.isFree ? 'Get Ticket' : 'Buy Ticket'}</Button>
    </form>
  );
}
