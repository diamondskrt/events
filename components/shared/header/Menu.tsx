'use client';

import { TextAlignLeftIcon } from '@radix-ui/react-icons';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

import NavItems from './NavItems';

import { useState } from 'react';

import { headerLinks } from './constants';

export default function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={(value) => setOpen(value)}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <TextAlignLeftIcon className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <NavItems items={headerLinks} setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
}
