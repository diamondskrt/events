import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { EventCollection } from '@/components/shared/event-collection';
import { Pagination, SearchParamProps } from '@/types';
import { getAllEvents } from '@/lib/actions/event.actions';

interface HomeProps extends SearchParamProps {}

export default async function Home({ searchParams }: HomeProps) {
  const pagination: Pagination = {
    page: Number(searchParams?.page) || 1,
    limit: 6,
    totalPages: null,
  };

  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  const events = await getAllEvents({
    query: searchText,
    category,
    page: pagination.page,
    limit: pagination.limit,
  });

  pagination.totalPages = events?.totalPages;

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
              <Button>
                <Link href="#events">Explore Now</Link>
              </Button>
            </div>

            <Image
              src="/assets/hero.png"
              alt="hero"
              width={1000}
              height={1000}
              className="max-h-[70vh] object-contain object-center 2xl:max-h-[60vh]"
            />
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

          <EventCollection
            events={events?.data}
            collectionType="All_Events"
            pagination={pagination}
          />
        </div>
      </section>
    </>
  );
}
