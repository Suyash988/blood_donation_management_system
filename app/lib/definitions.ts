// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

export type LatestDonation = {
  id: string;
  name: string;
  email: string;
  amount: string; // formatted like "450 mL"
  donation_date: string;
};

export type LatestDonationRaw = Omit<LatestDonation, 'amount'> & {
  amount: number;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type DonationsTable = {
  id: string
  donor_name: string
  email: string
  blood_group: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  donation_date: string        // ISO date string, e.g. "2025-04-24"
  amount_ml: number            // volume in milliliters
  status: 'collected' | 'tested' | 'released' | 'discarded'
}

export type DonationForm = {
  id: string
  donor_name: string
  age: number
  gender: 'Male' | 'Female' | 'Other'
  blood_group: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  email: string
  phone_number: string
  aadhaar_number: string
  address?: string
  weight: number
  medical_conditions?: string
  consent: boolean
  donation_date: string
  amount_ml: number
  status: 'collected' | 'tested' | 'released' | 'discarded'
  hemoglobin_level: number
  collection_center?: string
  remarks?: string
  created_at: string
  updated_at: string
}

export type DonorField = {
  id: string         // we’ll use aadhaar_number as the stable “ID”
  donor_name: string
}

export type DonorsTableType = {
  id: string                 // we use aadhaar_number as the stable ID
  donor_name: string
  email: string
  phone_number: string
  total_donations: number    // count of donation events
  total_volume: number       // sum of amount_ml
  last_donation_date: string  // ISO date of most recent donation
}

export type FormattedDonorsTable = {
  id: string
  donor_name: string
  email: string
  phone_number: string
  total_donations: number
  total_volume: number      // formatted like "450 mL"
  last_donation_date: string // formatted like "2025-04-24"
}

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};


export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export enum BloodGroup {
  A_POSITIVE = 'A+',
  A_NEGATIVE = 'A-',
  B_POSITIVE = 'B+',
  B_NEGATIVE = 'B-',
  AB_POSITIVE = 'AB+',
  AB_NEGATIVE = 'AB-',
  O_POSITIVE = 'O+',
  O_NEGATIVE = 'O-'
}

export enum DonationStatus {
  COLLECTED = 'collected',
  TESTED = 'tested',
  RELEASED = 'released',
  DISCARDED = 'discarded'
}

export interface Donation {
  id: string;
  donorName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: BloodGroup;
  email: string;
  phoneNumber: string;
  aadhaarNumber: string;
  address: string;
  weight: number;
  medicalConditions: string;
  consent: boolean;
  donationDate: Date | string;
  amountML: number;
  status: DonationStatus;
  hemoglobinLevel: number;
  collectionCenter: string;
  remarks: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Inventory {
  bloodGroup: BloodGroup;
  unitsAvailable: number;
  lastUpdated: Date | string;
}




