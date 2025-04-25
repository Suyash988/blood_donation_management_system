import postgres from 'postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
  Inventory,
  LatestDonationRaw,
  DonationsTable,
  DonationForm,
  DonorField,
  DonorsTableType
} from './definitions';
import { formatBloodAmount, formatDateToLocal } from './utils';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchInventory() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Inventory[]>`SELECT * FROM inventory`;

    // console.log('Data fetch completed after 3 seconds.');

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestDonations() {
  try {
    const data = await sql<LatestDonationRaw[]>`
      SELECT
        id,
        donor_name AS name,
        email,
        amount_ml AS amount,
        donation_date
      FROM donations
      ORDER BY donation_date DESC
      LIMIT 5
    `;

    const latestDonations = data.map((donation) => ({
      ...donation,
      amount: `${donation.amount} mL`,
    }));

    return latestDonations;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest donations.');
  }
}

function formatVolume(volume: number): string {
  return `${volume.toLocaleString()} mL`;
}

export async function fetchDonationCardData() {
  try {
    const donationCountPromise = sql`SELECT COUNT(*) FROM donations`;
    const donorCountPromise = sql`SELECT COUNT(DISTINCT aadhaar_number) FROM donations`;
    const donationStatusPromise = sql`
      SELECT
        SUM(CASE WHEN status = 'collected' THEN amount_ml ELSE 0 END) AS "collected",
        SUM(CASE WHEN status = 'tested' THEN amount_ml ELSE 0 END) AS "tested",
        SUM(CASE WHEN status = 'released' THEN amount_ml ELSE 0 END) AS "released",
        SUM(CASE WHEN status = 'discarded' THEN amount_ml ELSE 0 END) AS "discarded"
      FROM donations
    `;

    const [donationCountData, donorCountData, donationStatusData] = await Promise.all([
      donationCountPromise,
      donorCountPromise,
      donationStatusPromise,
    ]);

    const numberOfDonations = Number(donationCountData[0].count ?? '0');
    const numberOfDonors = Number(donorCountData[0].count ?? '0');

    const collected = Number(donationStatusData[0].collected ?? 0);
    const tested = Number(donationStatusData[0].tested ?? 0);
    const released = Number(donationStatusData[0].released ?? 0);
    const discarded = Number(donationStatusData[0].discarded ?? 0);

    const totalVolume = collected + tested + released + discarded;

    const percent = (val: number) => totalVolume ? `${((val / totalVolume) * 100).toFixed(1)}%` : '0%';

    return {
      numberOfDonations,
      numberOfDonors,
      collectedVolume: `${formatVolume(collected)}`,
      testedVolume: `${formatVolume(tested)} (${percent(tested)})`,
      releasedVolume: `${formatVolume(released)} (${percent(released)})`,
      discardedVolume: `${formatVolume(discarded)} (${percent(discarded)})`,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch donation card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredDonations(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  try {
    const donations = await sql<DonationsTable[]>`
      SELECT
        id,
        donor_name,
        email,
        blood_group,
        donation_date,
        amount_ml,
        status
      FROM donations
      WHERE
        donor_name       ILIKE ${`%${query}%`} OR
        email            ILIKE ${`%${query}%`} OR
        blood_group      ILIKE ${`%${query}%`} OR
        donation_date::text ILIKE ${`%${query}%`} OR
        amount_ml::text  ILIKE ${`%${query}%`} OR
        status           ILIKE ${`%${query}%`}
      ORDER BY donation_date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `

    return donations
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch filtered donations.')
  }
}

export async function fetchDonationsPages(query: string) {
  try {
    const data = await sql<{ count: string }[]>`
      SELECT COUNT(*) AS count
      FROM donations
      WHERE
        donor_name       ILIKE ${`%${query}%`} OR
        email            ILIKE ${`%${query}%`} OR
        phone_number     ILIKE ${`%${query}%`} OR
        blood_group      ILIKE ${`%${query}%`} OR
        donation_date::text ILIKE ${`%${query}%`} OR
        amount_ml::text  ILIKE ${`%${query}%`} OR
        status           ILIKE ${`%${query}%`}
    `

    const totalCount = Number(data[0]?.count ?? 0)
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)
    return totalPages
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch total number of donations.')
  }
}

export async function fetchDonationById(id: string) {
  try {
    const data = await sql<DonationForm[]>`
      SELECT
        id,
        donor_name,
        age,
        gender,
        blood_group,
        email,
        phone_number,
        aadhaar_number,
        address,
        weight,
        medical_conditions,
        consent,
        donation_date,
        amount_ml,
        status,
        hemoglobin_level,
        collection_center,
        remarks,
        created_at,
        updated_at
      FROM donations
      WHERE id = ${id};
    `
    if (data.length === 0) {
      throw new Error('Donation not found')
    }
    return data[0] || null
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch donation.')
  }
}

export async function fetchDonors() {
  try {
    const donors = await sql<DonorField[]>`
      SELECT DISTINCT ON (aadhaar_number)
        aadhaar_number    AS id,
        donor_name
      FROM donations
      ORDER BY
        aadhaar_number,  -- the DISTINCT key
        donation_date DESC  -- pick the most recent record per donor
    `
    return donors
  } catch (err) {
    console.error('Database Error:', err)
    throw new Error('Failed to fetch all donors.')
  }
}

export async function fetchFilteredDonors(query: string) {
  try {
    const data = await sql<DonorsTableType[]>`
      SELECT
        aadhaar_number      AS id,
        donor_name,
        email,
        phone_number,
        COUNT(*)             AS total_donations,
        SUM(amount_ml)       AS total_volume,
        MAX(donation_date)   AS last_donation_date
      FROM donations
      WHERE
        donor_name     ILIKE ${`%${query}%`} OR
        email          ILIKE ${`%${query}%`} OR
        phone_number   ILIKE ${`%${query}%`}
      GROUP BY
        aadhaar_number, donor_name, email, phone_number
      ORDER BY
        donor_name ASC
    `

    return data.map(d => ({
      ...d,
      // optional: format total_volume as mL string, or leave numeric
      total_volume: Number(d.total_volume),
      last_donation_date: new Date(d.last_donation_date).toISOString().slice(0, 10)
      // e.g. "2025-04-24"
    }))
  } catch (err) {
    console.error('Database Error:', err)
    throw new Error('Failed to fetch donor table.')
  }
}
