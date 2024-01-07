import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
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
        <div className="container">
          <div className="prose lg:prose-xl dark:prose-invert">
            <h2>
              Trust by <br /> Thousands of Events
            </h2>
          </div>
        </div>
      </section>
    </>
  );
}
