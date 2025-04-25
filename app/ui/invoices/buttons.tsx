import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import {deleteDonation} from '@/app/lib/actions';

export function CreateDonation() {
  return (
    <Link
      href="/dashboard/donation/create"
      className="flex h-10 items-center rounded-lg bg-bloodRed-500 px-4 text-sm font-medium text-white transition-colors hover:bg-bloodRed-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bloodRed-400"
    >
      <span className="hidden md:block">Record Donation</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateDonation({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/donation/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteDonation({ id }: { id: string }) {
  const deleteDonationWithId = deleteDonation.bind(null, id);
  return (
    <form action={deleteDonationWithId} >
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
