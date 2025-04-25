import { fetchFilteredDonors } from '@/app/lib/data';
import DonorsTable from '@/app/ui/donors/table';
import { Metadata } from 'next';
  
export const metadata: Metadata = {
    title: 'Donors',
  };
  
export default async function Page({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }) {
    const query = searchParams?.query || '';
    const donors = await fetchFilteredDonors(query);
  
    return (
      <main>
        <DonorsTable donors={donors} />
      </main>
    );
  }  