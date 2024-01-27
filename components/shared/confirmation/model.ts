import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface ConfirmationProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  confirm: () => void;
  children: ReactNode;
}
