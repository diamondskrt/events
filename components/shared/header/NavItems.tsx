import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/utils';

import { NavItemsProps, HeaderLink } from './model';

export default function NavItems({ items, setOpen }: NavItemsProps) {
  const pathname = usePathname();

  return (
    <ul>
      {items.map((item: HeaderLink) => {
        const isActive = pathname === item.route;

        return (
          <Link
            key={item.label}
            href={item.route}
            className={cn([
              'flex hover:opacity-70 my-2',
              { 'text-blue-500': isActive },
            ])}
            onClick={() => setOpen(false)}
          >
            <li className="font-black text-3xl">{item.label}</li>
          </Link>
        );
      })}
    </ul>
  );
}
