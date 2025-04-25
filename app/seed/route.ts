import bcrypt from 'bcryptjs';
import postgres from 'postgres';
import {users, donations, inventory} from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedDonations() {
  // ensure uuid generation is available
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  // create the donations table
  await sql`
    CREATE TABLE IF NOT EXISTS donations (
      id               UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),

      -- Donor Information
      donor_name       VARCHAR(255)   NOT NULL,
      age              INT            NOT NULL CHECK (age >= 18 AND age <= 65),
      gender           VARCHAR(10)    NOT NULL CHECK (gender IN ('Male','Female','Other')),
      blood_group      VARCHAR(5)     NOT NULL CHECK (blood_group IN ('A+','A-','B+','B-','AB+','AB-','O+','O-')),
      email            VARCHAR(255)   NOT NULL,
      phone_number     VARCHAR(15)    NOT NULL,
      aadhaar_number   VARCHAR(12)    NOT NULL,
      address          TEXT,
      weight           INT            NOT NULL CHECK (weight >= 50),
      medical_conditions TEXT,
      consent          BOOLEAN        NOT NULL DEFAULT false,

      -- Donation Details
      donation_date    DATE           NOT NULL,
      amount_ml        INT            NOT NULL CHECK (amount_ml BETWEEN 350 AND 500),
      status           VARCHAR(50)    NOT NULL CHECK (status IN ('collected','tested','released','discarded')),
      hemoglobin_level NUMERIC(4,2)   NOT NULL CHECK (hemoglobin_level >= 12.0 AND hemoglobin_level <= 20.0),
      collection_center VARCHAR(255),
      remarks          TEXT,

      -- enforce uniqueness so ON CONFLICT works
      UNIQUE (aadhaar_number, donation_date),

      -- Timestamps
      created_at       TIMESTAMP      NOT NULL DEFAULT now(),
      updated_at       TIMESTAMP      NOT NULL DEFAULT now()
    );
  `;

  // Insert combined data, skipping duplicates by aadhaar+date
  const insertedRecords = await Promise.all(
    donations.map(d => sql`
      INSERT INTO donations (
        donor_name, age, gender, blood_group,
        email, phone_number, aadhaar_number, address,
        weight, medical_conditions, consent,
        donation_date, amount_ml, status,
        hemoglobin_level, collection_center, remarks
      ) VALUES (
        ${d.donor_name},
        ${d.age},
        ${d.gender},
        ${d.blood_group},
        ${d.email ?? ''}, -- fallback
        ${d.phone_number},
        ${d.aadhaar_number},
        ${d.address ?? ''}, -- fallback
        ${d.weight},
        ${d.medical_conditions ?? ''}, -- fallback
        ${d.consent ?? false}, -- fallback
        ${d.donation_date},
        ${d.amount_ml},
        ${d.status},
        ${d.hemoglobin_level},
        ${d.collection_center ?? ''}, -- fallback
        ${d.remarks ?? ''} -- fallback
      )
      ON CONFLICT (aadhaar_number, donation_date) DO NOTHING;
    `)
  );

  return insertedRecords;
}



async function seedInventory() {
  // create the inventory table if it doesn't exist
  await sql`
    CREATE TABLE IF NOT EXISTS inventory (
      blood_group     VARCHAR(5)    PRIMARY KEY,
      units_available INT           NOT NULL,
      last_updated    TIMESTAMP     NOT NULL DEFAULT now()
    );
  `;

  // bulk-insert the inventory data, skipping any already present
  const insertedInventory = await Promise.all(
    inventory.map(item => sql`
      INSERT INTO inventory (blood_group, units_available)
      VALUES (${item.blood_group}, ${item.units_available})
      ON CONFLICT (blood_group) DO NOTHING;
    `)
  );

  return insertedInventory;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      seedUsers(),
      seedDonations(),
      seedInventory(),
    ]);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}