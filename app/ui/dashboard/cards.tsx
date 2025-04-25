import {
  EyeDropperIcon,
  TrashIcon,
  HandRaisedIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchDonationCardData } from '@/app/lib/data';

const iconMap = {
  collected: EyeDropperIcon,
  customers: UserGroupIcon,
  pending: TrashIcon,
  invoices: HandRaisedIcon,
  released: ArrowTrendingUpIcon,
  tested: BeakerIcon,
};

export default async function CardWrapper() {
  const {numberOfDonations, numberOfDonors,collectedVolume, discardedVolume, releasedVolume, testedVolume} = await fetchDonationCardData();
  return (
    <>
              <Card title="Collected" value={collectedVolume} type="collected" />
              <Card title="Discarded" value={discardedVolume} type="pending" />
              <Card title="Released" value={releasedVolume} type="released" />
              <Card title="Tested" value={testedVolume} type="tested" />
              <Card title="Total Donations" value={numberOfDonations} type="invoices" />
              <Card
                title="Total Donors"
                value={numberOfDonors}
                type="customers"
              />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected' | 'released' | 'tested';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
