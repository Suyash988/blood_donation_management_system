import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listDonations() {
	const data = await sql`
    SELECT donations.donor_name, donations.blood_group, donations.donation_date, donations.amount_ml
    FROM donations
  `;

	return data;
}

export async function GET() {
  try {
  	return Response.json(await listDonations());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}


