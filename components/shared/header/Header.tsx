import Link from 'next/link';
import Image from 'next/image';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { ThemeSwitcher } from '@/components/shared/theme-switcher';
import { Button } from '@/components/ui/button';
import Menu from './Menu';
import User from './User';

export default function Header() {
  return (
    <header className="shadow-md p-4 py-3 py-md-2">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image src="/assets/logo.png" alt="logo" width={60} height={60} />
        </Link>

        <div className="flex items-center gap-4">
          <SignedIn>
            <div className="flex items-center gap-4">
              <div>
                <User />
              </div>
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
