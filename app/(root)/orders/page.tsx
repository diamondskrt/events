import { Table } from '@/components/shared/table';
import { InputSearch } from '@/components/shared/input-search';
import { getOrdersByEvent } from '@/lib/actions/order.actions';

import { columns } from './constants';
import { OrdersProps, Source } from './models';

export default async function Orders({ searchParams }: OrdersProps) {
  const { eventId, query: searchText } = searchParams;

  const orders = await getOrdersByEvent({ eventId, searchString: searchText });

  return (
    <section>
      <div className="flex flex-col gap-6 container py-4">
        <div className="prose lg:prose-xl dark:prose-invert max-w-none">
          <h3 className="text-center sm:text-left">Orders</h3>
        </div>

        <div className="w-[450px]">
          <InputSearch placeholder="Search by Buyer" />
        </div>

        <Table<Source>
          columns={columns}
          dataSource={orders || []}
          rowKey="_id"
        />
      </div>
    </section>
  );
}
