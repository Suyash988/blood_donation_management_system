import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import {
  DonorsTableType,
  FormattedDonorsTable,
} from '@/app/lib/definitions';

export default async function DonorsTable({
  donors,
}: {
  donors: FormattedDonorsTable[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Donors
      </h1>
      <Search placeholder="Search donors..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {donors?.map((donor) => (
                  <div
                    key={donor.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <p>{donor.donor_name}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {donor.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Total Donations</p>
                        <p className="font-medium">{donor.total_donations}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Total Volume</p>
                        <p className="font-medium">{donor.total_volume}</p>
                      </div>
                    </div>
                    <div className="pt-4 text-sm">
                      <p>{donor.last_donation_date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total Donations
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total Volume
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Phone Number
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {donors.map((donor) => (
                    <tr key={donor.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <p>{donor.donor_name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {donor.email}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {donor.total_donations}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {donor.total_volume}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {donor.phone_number}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
