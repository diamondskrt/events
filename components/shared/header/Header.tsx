import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ThemeSwitcher } from "@/components/shared/theme-switcher";
import { Button } from "@/components/ui/button";
import Menu from "./Menu";
import User from "./User";

export default function Header() {
  return (
    <header className="shadow-md p-4">
      <div className="flex items-center justify-between">
        <Link href="/">
          Logo
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
  )
}