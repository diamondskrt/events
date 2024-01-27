import { Dispatch, SetStateAction } from 'react';

export interface NavItemsProps {
  items: HeaderLink[];
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface HeaderLink {
  label: string;
  route: string;
}
