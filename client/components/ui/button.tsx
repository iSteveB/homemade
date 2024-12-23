import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default:
					'border border-primary/10 bg-neutral text-primary shadow hover:bg-neutral/90 active:shadow-sm dark:bg-neutral dark:text-dark-primary dark:hover:bg-neutral/80 active:dark:bg-neutral/50',
				destructive:
					'bg-red-500 text-neutral shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral dark:hover:bg-red-900/90',
				outline:
					'border border-neutral bg-white text-secondary shadow-sm hover:bg-primary/10 active:bg-primary/20 dark:border-neutral dark:bg-dark-primary dark:text-neutral dark:hover:bg-primary',
				secondary:
					'bg-neutral text-neutral shadow-sm hover:bg-neutral/80 dark:bg-neutral dark:text-neutral dark:hover:bg-neutral/80',
				ghost: 'hover:bg-primary hover:text-neutral dark:text-neutral',
				link: 'text-neutral underline-offset-4 hover:underline dark:text-neutral',
			},
			size: {
				default: 'h-9 px-4 py-2',
				sm: 'h-8 rounded-md px-3 text-xs',
				lg: 'h-10 rounded-md px-8',
				icon: 'size-9',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = 'Button';

export { Button, buttonVariants };
