import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { EventCollection } from '@/components/shared/event-collection';
import { InputSearch } from '@/components/shared/input-search';
import { FilterCategory } from '@/components/shared/filter-category';
import { getAllEvents } from '@/lib/actions/event.actions';
import { Pagination } from '@/types';

interface HomeProps {
  searchParams: {
    page?: number;
    query?: string;
    categoryId?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const { page = '1', categoryId = '', query: searchText = '' } = searchParams;

  const pagination: Pagination = {
    page: Number(page),
    limit: 6,
    totalPages: 1,
  };

  const events = await getAllEvents({
    query: searchText,
    categoryId,
    page: pagination.page,
    limit: pagination.limit,
  });

  pagination.totalPages = events?.totalPages || 1;

  return (
    <>
      <section className="py-5 md:py-10">
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-2 2xl:gap-0">
            <div className="prose lg:prose-xl dark:prose-invert">
              <h1>Host, Connect, Celebrate: Your Events, Our Platform!</h1>
              <p>
                Book and learn helpful tips from 3,168+ mentors in world-class
                companies with our global community.
              </p>
              <Link href="#events">
                <Button>Explore Now</Button>
              </Link>
            </div>

            <div className="2xl:bg-primary rounded-full py-6 px-4">
              <Image
                src="/assets/hero.png"
                alt="hero"
                width={1000}
                height={1000}
                className="max-h-[70vh] object-contain object-center 2xl:max-h-[60vh]"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="events" className="py-5 md:py-10">
        <div className="flex flex-col gap-6 container py-4">
          <div className="prose lg:prose-xl dark:prose-invert">
            <h2>
              Trust by <br /> Thousands of Events
            </h2>
          </div>

          <div className="flex gap-4">
            <div className="w-[350px]">
              <InputSearch placeholder="Search by Title" />
            </div>
            <div className="w-[250px]">
              <FilterCategory />
            </div>
          </div>

          <EventCollection events={events?.data} pagination={pagination} />
        </div>
      </section>
    </>
  );
}
