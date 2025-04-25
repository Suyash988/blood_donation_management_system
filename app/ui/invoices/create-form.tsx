import { UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createDonation } from '@/app/lib/actions';

export default function DonationForm() {
   
  return (
    <form action={createDonation} noValidate>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Donor Name */}
        <div className="mb-4">
          <label htmlFor="donor_name" className="mb-2 block text-sm font-medium">
            Donor Name
          </label>
          <div className="relative">
            <input
              required
              id="donor_name"
              name="donor_name"
              type="text"
              placeholder="Enter donor's name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Age, Gender, Blood Group */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="age" className="mb-2 block text-sm font-medium">Age</label>
            <input required type="number" id="age" name="age" className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
          </div>
          <div>
            <label htmlFor="gender" className="mb-2 block text-sm font-medium">Gender</label>
            <select required id="gender" name="gender" className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm">
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="blood_group" className="mb-2 block text-sm font-medium">Blood Group</label>
            <select required id="blood_group" name="blood_group" className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm">
            <option value="">Select</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-'</option>
            </select>
          </div>
        </div>

        {/* Email, Phone Number */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
            <input required type="email" id="email" name="email" className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
          </div>
          <div>
            <label htmlFor="phone_number" className="mb-2 block text-sm font-medium">Phone Number</label>
            <input required type="text" id="phone_number" name="phone_number" className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
          </div>
        </div>

        {/* Aadhaar Number, Weight */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="aadhaar_number" className="mb-2 block text-sm font-medium">Aadhaar Number</label>
            <input required type="text" id="aadhaar_number" name="aadhaar_number" className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
            <label htmlFor="address" className="mb-2 block text-sm font-medium">Address</label>
            <textarea required id="address" name="address" rows={2} className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
          </div>
          <div>
            <label htmlFor="weight" className="mb-2 block text-sm font-medium">Weight (kg)</label>
            <input required type="number" id="weight" name="weight" className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
          </div>
        </div>

        {/* Medical Conditions */}
        <div className="mb-4">
          <label htmlFor="medical_conditions" className="mb-2 block text-sm font-medium">Medical Conditions</label>
          <textarea required id="medical_conditions" name="medical_conditions" rows={2} className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
        </div>

        {/* Consent */}
        <div className="mb-4">
          <label className="text-sm font-medium flex items-center gap-2">
            <input required type="checkbox" name="consent" className="h-4 w-4" />
            I give consent for the donation
          </label>
        </div>

        {/* Donation Info */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="donation_date" className="mb-2 block text-sm font-medium">Donation Date</label>
            <input  required type="date" id="donation_date" name="donation_date" className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
          </div>
          <div>
            <label htmlFor="amount_ml" className="mb-2 block text-sm font-medium">Amount (ml)</label>
            <input required type="number" id="amount_ml" name="amount_ml" className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
          </div>
          <div>
            <label htmlFor="status" className="mb-2 block text-sm font-medium">Status</label>
            <select required id="status" name="status" className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm">
              <option value="">Select</option>
              <option value="collected">Collected</option>
              <option value="tested">Tested</option>
              <option value="released">Released</option>
              <option value="discarded">Discarded</option>
            </select>
          </div>
        </div>

        {/* Hemoglobin Level, Collection Center */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="hemoglobin_level" className="mb-2 block text-sm font-medium">Hemoglobin Level (g/dL)</label>
            <input required type="number" step="0.1" id="hemoglobin_level" name="hemoglobin_level" className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
          </div>
          <div>
            <label htmlFor="collection_center" className="mb-2 block text-sm font-medium">Collection Center</label>
            <input required type="text" id="collection_center" name="collection_center" className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
          </div>
        </div>

        {/* Remarks */}
        <div className="mb-4">
          <label htmlFor="remarks" className="mb-2 block text-sm font-medium">Remarks</label>
          <textarea required id="remarks" name="remarks" rows={2} className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm" />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/donation"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Register</Button>
      </div>
    </form>
  );
}

