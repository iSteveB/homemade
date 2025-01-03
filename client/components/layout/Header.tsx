'use client';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MessageSquare, Bell, Settings, LogOut } from 'lucide-react';
import Logo from '../ui/Logo';
import SearchBar from '../ui/SearchBar';
import Link from 'next/link';
// import { Switch } from '@/components/ui/switch'
import { useTheme } from '@/hook/useTheme';
import useThemeStore from '@/lib/store/useThemeStore';
import useUserData from '@/hook/user/useUserData';
import useLogout from '@/hook/auth/useLogout';
import { getPictureEndpoint } from '@/lib/utils';
import UserAvatar from '../UserAvatar';

// Mock notifications data
const notifications = [
	{ id: 1, message: 'New message from John', time: '5 minutes ago' },
	{ id: 2, message: 'You have a new follower', time: '1 hour ago' },
	{ id: 3, message: 'Your post was liked by Jane', time: '2 hours ago' },
	{ id: 4, message: 'Reminder: Team meeting at 3 PM', time: '3 hours ago' },
];

export default function Header() {
	const { userData, userDataIsLoading, userDataError } = useUserData();
	const { logout } = useLogout();

	const toggleTheme = useThemeStore((state) => state.toggleTheme);
	useTheme();

	const handleLogout = () => {
		try {
			logout();
		} catch (error) {
			console.error('Error logging out:', error);
		}
	};

	if (userDataIsLoading) {
		return <p>Loading...</p>;
	}

	if (userDataError) {
		handleLogout();
		return null;
	}

	return (
		<header className='border-b border-neutral dark:border-dark-neutral'>
			<div className='container mx-auto flex items-center justify-between px-4 py-2'>
				<div className='flex-1'>
					<Logo />
				</div>
				<div className='flex-auto'>
					<SearchBar />
				</div>
				<div className='flex flex-1 items-center justify-end space-x-2 '>
					{/* Private Message Button */}
					<Button
						variant='ghost'
						size='icon'
						aria-label='Private Messages'>
						<MessageSquare className='size-6' />
					</Button>

					{/* Notification Dropdown */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
								aria-label='Notifications'>
								<Bell className='size-6' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end' className='w-80'>
							<DropdownMenuLabel>Notifications</DropdownMenuLabel>
							<DropdownMenuSeparator />
							{notifications.map((notification) => (
								<DropdownMenuItem
									key={notification.id}
									className='flex flex-col items-start'>
									<span className='font-medium'>
										{notification.message}
									</span>
									<span className='text-sm'>
										{notification.time}
									</span>
								</DropdownMenuItem>
							))}
							<DropdownMenuSeparator />
							<DropdownMenuItem className='w-full text-center'>
								<Button variant='link' className='w-full'>
									View all notifications
								</Button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					{/* Profile Button */}
					<Link
						href={`/profile/${userData?.username}`}
						className='overflow-hidden rounded-lg'
						aria-label='Go to profile'>
						<UserAvatar
							src={getPictureEndpoint(
								userData?.username || '',
								'avatar'
							)}
							alt={`Profile picture of ${userData?.username}`}
							username={userData?.username || ''}
							className='rounded-lg size-12'
						/>
					</Link>

					{/* Settings Dropdown */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
								aria-label='Settings'>
								<Settings className='size-6' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuLabel>Settings</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<div className='flex w-full items-center justify-between'>
									<Button
										onClick={toggleTheme}
										aria-label='Toggle dark mode'>
										Toogle Dark Mode
									</Button>
								</div>
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={handleLogout}
								className='cursor-pointer'>
								<LogOut className='mr-2 size-4' />
								<span>Logout</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
