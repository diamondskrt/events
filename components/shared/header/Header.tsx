import { SignedIn, SignedOut } from '@clerk/nextjs';

import Link from 'next/link';

import { ThemeSwitcher } from '@/components/shared/theme-switcher';
import { Icon } from '@/components/shared/icon';
import { Button } from '@/components/ui/button';

import Menu from './Menu';
import User from './User';

export default function Header() {
  return (
    <header className="shadow-md p-4 py-6 py-md-2">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Icon name="logo" className="w-8 h-8 black dark:white" />
        </Link>

        <div className="flex items-center gap-4">
          <SignedIn>
            <div className="flex items-center gap-4">
              <User />
              <Menu />
            </div>
          </SignedIn>
          <SignedOut>
            <Button>
              <Link href="sign-in">Log in</Link>
            </Button>
          </SignedOut>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
