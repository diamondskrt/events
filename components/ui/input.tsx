import { cn } from '@/utils';
import { ReactNode, forwardRef, InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  appendIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ appendIcon, className, type, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            'flex h-10 w-full outline-none rounded-md border border-input focus:border-primary bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
        {appendIcon && (
          <div className="absolute top-0 right-0 h-10 flex items-center text-muted-foreground px-3">
            {appendIcon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
