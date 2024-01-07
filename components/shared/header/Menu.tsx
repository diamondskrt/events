import { TextAlignLeftIcon } from '@radix-ui/react-icons';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import NavItems from './NavItems';
import { headerLinks } from './constants';

export default function Menu() {
  return (
    <Sheet>
      <SheetTrigger>
        <TextAlignLeftIcon className="w-5 h-5" />
      </SheetTrigger>
      <SheetContent>
        <NavItems items={headerLinks} />
      </SheetContent>
    </Sheet>
  );
}
