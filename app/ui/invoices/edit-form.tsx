'use client';

import { DonationForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  UserCircleIcon,
  ArrowRightEndOnRectangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateDonation } from '@/app/lib/actions';

export default function EditDonationForm({
  donation,
}: {
  donation: DonationForm;
}) {
  const updateDonationWithId = updateDonation.bind(null,donation.id,);
  return (
    <form  noValidate>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Donor Name */}
        <div className="mb-4">
          <label htmlFor="donor_name" className="mb-2 block text-sm font-medium">
            Donor Name
          </label>
          <div className="relative">
            <input
              id="donor_name"
              name="donor_name"
              type="text"
              defaultValue={donation.donor_name}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Age */}
        <div className="mb-4">
          <label htmlFor="age" className="mb-2 block text-sm font-medium">
            Age
          </label>
          <input
            id="age"
            name="age"
            type="number"
            defaultValue={donation.age}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
          />
        </div>

        {/* Blood Group */}
        <div className="mb-4">
          <label htmlFor="blood_group" className="mb-2 block text-sm font-medium">
            Blood Group
          </label>
          <select
            id="blood_group"
            name="blood_group"
            defaultValue={donation.blood_group}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
          >
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        {/* Amount Donated */}
        <div className="mb-4">
          <label htmlFor="amount_ml" className="mb-2 block text-sm font-medium">
            Amount (ml)
          </label>
          <input
            id="amount_ml"
            name="amount_ml"
            type="number"
            defaultValue={donation.amount_ml}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
          />
        </div>

        {/* Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Donation Status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex items-center">
                <input
                  id="collected"
                  name="status"
                  type="radio"
                  value="collected"
                  defaultChecked={donation.status === 'collected'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="collected"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Collected <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="tested"
                  name="status"
                  type="radio"
                  value="tested"
                  defaultChecked={donation.status === 'tested'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="tested"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Tested <CheckIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="released"
                  name="status"
                  type="radio"
                  value="released"
                  defaultChecked={donation.status === 'released'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="released"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-orange-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Released <ArrowRightEndOnRectangleIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="discarded"
                  name="status"
                  type="radio"
                  value="discarded"
                  defaultChecked={donation.status === 'discarded'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="discarded"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Discarded <CheckCircleIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>

      {/* Footer buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/donation"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update Donation</Button>
      </div>
    </form>
  );
}
