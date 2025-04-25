import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';

 
export default async function Page() {
    
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Donations', href: '/dashboard/donation' },
          {
            label: 'Record Donation',
            href: '/dashboard/donation/create',
            active: true,
          },
        ]}
      />
      <Form/>
    </main>
  );
}