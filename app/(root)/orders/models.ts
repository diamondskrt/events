export interface Source {
  _id: string;
  createdAt: string;
  totalAmount: string;
  eventTitle: string;
  eventId: string;
  buyer: string;
}

export interface OrdersProps {
  searchParams: {
    eventId: string;
    query?: string;
  };
}
