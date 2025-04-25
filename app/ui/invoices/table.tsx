import {DeleteDonation, UpdateDonation } from '@/app/ui/invoices/buttons';
import { formatDateToLocal, formatBloodAmount } from '@/app/lib/utils';
import { fetchFilteredDonations } from '@/app/lib/data';
import DonationStatus from '@/app/ui/invoices/status';

export default async function DonationsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const donations = await fetchFilteredDonations(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {donations?.map((donation) => (
              <div
                key={donation.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{donation.donor_name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{donation.email}</p>
                    <p className="text-sm text-gray-500">{donation.blood_group}</p>
                  </div>
                  <DonationStatus status={donation.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatBloodAmount(donation.amount_ml)}
                    </p>
                    <p>{formatDateToLocal(donation.donation_date,)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    {/* <UpdateDonation id={donation.id} /> */}
                    <DeleteDonation id={donation.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {donations?.map((donation) => (
                <tr
                  key={donation.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{donation.donor_name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {donation.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatBloodAmount(donation.amount_ml)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(donation.donation_date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <DonationStatus status={donation.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      {/* <UpdateDonation id={donation.id} /> */}
                      <DeleteDonation id={donation.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
