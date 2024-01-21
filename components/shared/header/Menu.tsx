import { TextAlignLeftIcon } from '@radix-ui/react-icons';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import NavItems from './NavItems';
import { headerLinks } from './constants';
import { Button } from '@/components/ui/button';

export default function Menu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <TextAlignLeftIcon className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <NavItems items={headerLinks} />
      </SheetContent>
    </Sheet>
  );
}
