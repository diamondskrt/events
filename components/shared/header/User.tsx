'use client';

import { UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';

export default function User() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <UserButton
      appearance={isLight ? {} : { baseTheme: dark }}
      afterSignOutUrl="/"
    />
  );
}
