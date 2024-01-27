import stripe from 'stripe';

import { NextResponse } from 'next/server';

import { createOrder } from '@/lib/actions/order.actions';

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get('stripe-signature') as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

  try {
    const event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    const eventType = event.type;

    if (eventType === 'checkout.session.completed') {
      const { id, amount_total, metadata } = event.data.object;

      const order = {
        stripeId: id,
        eventId: metadata?.eventId || '',
        buyerId: metadata?.buyerId || '',
        totalAmount: amount_total ? String(amount_total / 100) : '0',
        createdAt: new Date(),
      };

      const newOrder = await createOrder(order);
      return NextResponse.json({ message: 'OK', order: newOrder });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Webhook error', error });
  }
}
