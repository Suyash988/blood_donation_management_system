'use server'

import {z} from 'zod';
import postgres from 'postgres';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from '@/auth';
import { AuthError } from 'next-auth'; 

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
    id: z.string(),
    donor_name: z.string().min(1, { message: 'Name is required' }),
    age: z.number().min(18, { message: 'Age must be at least 18' }).max(65, { message: 'Age must be less than or equal to 65' }),
    gender: z.enum(['Male', 'Female', 'Other']),
    blood_group: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    email: z.string().email({ message: 'Invalid email address' }),
    phone_number: z.string().regex(/^\d{10}$/, { message: 'Phone number must be 10 digits' }),
    aadhaar_number: z.string().regex(/^\d{12}$/, { message: 'Aadhaar number must be 12 digits' }),
    address: z.string().optional().default(''),
    weight: z.number().min(50, { message: 'Weight must be at least 50 kg' }),
    medical_conditions: z.string().optional().default(''),
    consent: z.boolean().refine(val => val === true, { message: 'Consent is required' }),
    donation_date: z.string().refine(val => !isNaN(Date.parse(val)), { message: 'Invalid date' }),
    amount_ml: z.number().min(350).max(500, { message: 'Amount must be between 350 and 500 ml' }),
    status: z.enum(['collected', 'tested', 'released', 'discarded']),
    hemoglobin_level: z.number().min(12.0).max(20.0, { message: 'Hemoglobin level must be between 12.0 and 20.0' }),
    collection_center: z.string().optional().default(''),
    remarks: z.string().optional().default(''),
    created_at: z.string(),
    updated_at: z.string(),
});

const CreateDonation = FormSchema.omit({id: true, created_at: true, updated_at: true}); 



export async function createDonation(formData: FormData) {
    
  const parsedData = CreateDonation.parse({
  donor_name: formData.get('donor_name')?.toString() ?? '',
  age: Number(formData.get('age') ?? 0),
  gender: formData.get('gender')?.toString() ?? 'Other',
  blood_group: formData.get('blood_group')?.toString() ?? 'O+',
  email: formData.get('email')?.toString() ?? '',
  phone_number: formData.get('phone_number')?.toString() ?? '',
  aadhaar_number: formData.get('aadhaar_number')?.toString() ?? '',
  address: formData.get('address')?.toString() ?? '',
  weight: Number(formData.get('weight') ?? 0),
  medical_conditions: formData.get('medical_conditions')?.toString() ?? '',
  consent: formData.get('consent') === 'on',
  donation_date: formData.get('donation_date')?.toString() ?? '',
  amount_ml: Number(formData.get('amount_ml') ?? 0),
  status: formData.get('status')?.toString() ?? 'collected',
  hemoglobin_level: Number(formData.get('hemoglobin_level') ?? 0),
  collection_center: formData.get('collection_center')?.toString() ?? '',
  remarks: formData.get('remarks')?.toString() ?? '',
  });
  

    try {
    await sql`
    INSERT INTO donations (
      donor_name, age, gender, blood_group, email, phone_number, aadhaar_number,
      address, weight, medical_conditions, consent, donation_date, amount_ml,
      status, hemoglobin_level, collection_center, remarks
    ) VALUES (
      ${parsedData.donor_name}, ${parsedData.age}, ${parsedData.gender}, ${parsedData.blood_group},
      ${parsedData.email}, ${parsedData.phone_number}, ${parsedData.aadhaar_number},
      ${parsedData.address}, ${parsedData.weight}, ${parsedData.medical_conditions},
      ${parsedData.consent}, ${parsedData.donation_date}, ${parsedData.amount_ml},
      ${parsedData.status}, ${parsedData.hemoglobin_level}, ${parsedData.collection_center}, ${parsedData.remarks}
    )
  `;
  } catch (error) {
    console.error('Donation creation failed:', error);
  }
  revalidatePath('/dashboard/donation');
  redirect('/dashboard/donation'); // Redirect to the donations page after successful creation
}

const EditDonationSchema = z.object({
  donor_name: z.string().min(1, { message: 'Name is required' }),
  age: z.coerce.number().min(18, { message: 'Minimum age is 18' }).max(65),
  blood_group: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  amount_ml: z.coerce.number().min(350).max(500),
  status: z.enum(['collected', 'tested', 'released', 'discarded']),
  created_at: z.string(),
  updated_at: z.string(),
});

const UpdateDonation = EditDonationSchema.omit({created_at: true})

export async function updateDonation(id: string, formData: FormData) {
  try {
    const data = UpdateDonation.parse({
      donor_name: formData.get('donor_name'),
      age: formData.get('age'),
      blood_group: formData.get('blood_group'),
      amount_ml: formData.get('amount_ml'),
      status: formData.get('status'),
    });

    const updated_at = new Date().toISOString();
    
    await sql`
      UPDATE donations SET
        donor_name = ${data.donor_name},
        age = ${data.age},
        blood_group = ${data.blood_group},
        amount_ml = ${data.amount_ml},
        status = ${data.status},
        updated_at = ${updated_at}
      WHERE id = ${id};
    `;
    return {success: true};
    
}catch (error) {
  console.error('Donation update failed:', error);
  return { success: false, error: (error as Error).message };
}
}

export async function deleteDonation(id: string) {
  try{
  await sql`DELETE FROM donations WHERE id = ${id}`;
  revalidatePath('/dashboard/donation');
  }catch (error) {
    console.error('Donation deletion failed:', error);
   revalidatePath('/dashboard/donation');
}
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch ((error as any).type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
