import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchDonationById } from '@/app/lib/data';
import {notFound} from 'next/navigation';
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const donor = await fetchDonationById(id);

  if(!donor) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Donations', href: '/dashboard/donation' },
          {
            label: 'Edit Donation',
            href: `/dashboard/donation/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form donation={donor} />
    </main>
  );
}