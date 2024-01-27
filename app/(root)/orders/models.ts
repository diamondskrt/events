export interface Source {
  _id: string;
  createdAt: Date;
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
