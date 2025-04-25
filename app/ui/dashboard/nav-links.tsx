'use client';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Donations',
    href: '/dashboard/donation',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Donars', href: '/dashboard/donar', icon: UserGroupIcon },
  // { name: 'Prediction', href: '/dashboard/prediction', icon: ChartBarIcon }
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx('flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-bloodRed-600 hover:text-bloodRed-400 md:flex-none md:justify-start md:p-2 md:px-3',{
              'bg-bloodRed-600 text-bloodRed-400': pathname === link.href,
            })}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
