// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:

import { Donation } from "./definitions";

// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const customers = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: customers[2].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[0].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];


const donors = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    donor_name: 'John Sharma',
    age: 28,
    gender: 'Male',
    blood_group: 'O+',
    email: 'john.sharma@example.com',
    phone_number: '91-9876543210',
    aadhaar_number: '123456789012',
    address: '12 Gandhi Road, Mumbai',
    weight: 65,
    last_donation_date: '2024-01-15',
    donation_date: '2024-03-01',
    medical_conditions: 'None',
    consent: true
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    donor_name: 'Priya Patel',
    age: 32,
    gender: 'Female',
    blood_group: 'A-',
    email: 'priya.patel@example.com',
    phone_number: '91-9876543211',
    aadhaar_number: '234567890123',
    address: '45 Nehru Street, Delhi',
    weight: 58,
    last_donation_date: '2023-12-01',
    donation_date: '2024-03-05',
    medical_conditions: 'Allergy to penicillin',
    consent: true
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    donor_name: 'Rahul Gupta',
    age: 24,
    gender: 'Male',
    blood_group: 'B+',
    email: 'rahul.gupta@example.com',
    phone_number: '91-9876543212',
    aadhaar_number: '345678901234',
    address: '78 Tagore Lane, Kolkata',
    weight: 72,
    last_donation_date: null,
    donation_date: '2024-03-10',
    medical_conditions: 'None',
    consent: true
  }
];

const donations = [
  {
    // Donor Info
    donor_name: 'Rahul Sharma',
    age: 28,
    gender: 'Male',
    blood_group: 'O+',
    email: 'rahul@example.com',
    phone_number: '91-9876543210',
    aadhaar_number: '123456789012',
    address: 'Mumbai, India',
    weight: 65,
    medical_conditions: 'None',
    consent: true,
    
    // Donation Info
    donation_date: '2024-03-15',
    amount_ml: 450,
    status: 'collected',
    hemoglobin_level: 14.2,
    collection_center: 'City Blood Bank',
    remarks: 'First-time donor'
  },
  {
    donor_name: 'Priya Patel',
    age: 32,
    gender: 'Female',
    blood_group: 'A-',
    phone_number: '91-9876543211',
    aadhaar_number: '234567890123',
    address: 'Delhi, India',
    weight: 58,
    medical_conditions: 'Allergy to penicillin',
    consent: true,
    donation_date: '2024-03-18',
    amount_ml: 400,
    status: 'tested',
    hemoglobin_level: 13.8,
    collection_center: 'Central Hospital',
    remarks: 'Regular donor'
  },
  {
    donor_name: 'Priya Patel',
    age: 32,
    gender: 'Female',
    blood_group: 'A+',
    email: 'priya.patel@example.com',
    phone_number: '91-9123456789',
    aadhaar_number: '234567890123',
    address: 'Ahmedabad, India',
    weight: 60,
    medical_conditions: 'None',
    consent: true,

    donation_date: '2024-04-10',
    amount_ml: 450,
    status: 'tested',
    hemoglobin_level: 13.8,
    collection_center: 'Ahmedabad Blood Center',
    remarks: 'Routine quarterly donation'
  },
  {
    donor_name: 'Vikram Singh',
    age: 45,
    gender: 'Male',
    blood_group: 'B+',
    email: 'vikram.singh@example.com',
    phone_number: '91-9988776655',
    aadhaar_number: '345678901234',
    address: 'Lucknow, India',
    weight: 75,
    medical_conditions: 'Controlled hypertension',
    consent: true,

    donation_date: '2024-05-02',
    amount_ml: 350,
    status: 'released',
    hemoglobin_level: 14.5,
    collection_center: 'Lucknow General Hospital',
    remarks: 'Second donation this year'
  },
  {
    donor_name: 'Anita Desai',
    age: 29,
    gender: 'Female',
    blood_group: 'O-',
    email: 'anita.desai@example.com',
    phone_number: '91-9870012345',
    aadhaar_number: '456789012345',
    address: 'Pune, India',
    weight: 55,
    medical_conditions: 'None',
    consent: true,

    donation_date: '2024-03-20',
    amount_ml: 400,
    status: 'collected',
    hemoglobin_level: 12.9,
    collection_center: 'Pune City Blood Bank',
    remarks: 'Good hemoglobin'
  },
  {
    donor_name: 'Rohit Verma',
    age: 35,
    gender: 'Male',
    blood_group: 'AB+',
    email: 'rohit.verma@example.com',
    phone_number: '91-9900112233',
    aadhaar_number: '567890123456',
    address: 'Chennai, India',
    weight: 70,
    medical_conditions: 'None',
    consent: true,

    donation_date: '2024-04-18',
    amount_ml: 450,
    status: 'tested',
    hemoglobin_level: 15.2,
    collection_center: 'Chennai Red Cross',
    remarks: 'All clear'
  },
  {
    donor_name: 'Megha Rao',
    age: 26,
    gender: 'Female',
    blood_group: 'B-',
    email: 'megha.rao@example.com',
    phone_number: '91-9112233445',
    aadhaar_number: '678901234567',
    address: 'Bengaluru, India',
    weight: 58,
    medical_conditions: 'None',
    consent: true,

    donation_date: '2024-05-05',
    amount_ml: 350,
    status: 'released',
    hemoglobin_level: 13.4,
    collection_center: 'Bengaluru Metro Blood Bank',
    remarks: 'Smooth process'
  },
  {
    donor_name: 'Suresh Kumar',
    age: 40,
    gender: 'Male',
    blood_group: 'A-',
    email: 'suresh.kumar@example.com',
    phone_number: '91-9898765432',
    aadhaar_number: '789012345678',
    address: 'Kolkata, India',
    weight: 80,
    medical_conditions: 'None',
    consent: true,

    donation_date: '2024-04-25',
    amount_ml: 500,
    status: 'collected',
    hemoglobin_level: 14.0,
    collection_center: 'Kolkata Health Center',
    remarks: 'High volume'
  },
  {
    donor_name: 'Karishma Jain',
    age: 31,
    gender: 'Female',
    blood_group: 'AB-',
    email: 'karishma.jain@example.com',
    phone_number: '91-9776655443',
    aadhaar_number: '890123456789',
    address: 'Jaipur, India',
    weight: 62,
    medical_conditions: 'None',
    consent: true,

    donation_date: '2024-05-07',
    amount_ml: 400,
    status: 'tested',
    hemoglobin_level: 13.7,
    collection_center: 'Rajasthan Blood Bank',
    remarks: 'All parameters normal'
  },
  {
    donor_name: 'Amit Patel',
    age: 37,
    gender: 'Male',
    blood_group: 'O+',
    email: 'amit.patel@example.com',
    phone_number: '91-9665544332',
    aadhaar_number: '901234567890',
    address: 'Surat, India',
    weight: 72,
    medical_conditions: 'None',
    consent: true,

    donation_date: '2024-04-30',
    amount_ml: 450,
    status: 'released',
    hemoglobin_level: 14.8,
    collection_center: 'Surat Civil Hospital',
    remarks: 'Volunteer donor'
  },
  {
    donor_name: 'Neha Singh',
    age: 24,
    gender: 'Female',
    blood_group: 'O-',
    email: 'neha.singh@example.com',
    phone_number: '91-9554433221',
    aadhaar_number: '112233445566',
    address: 'Indore, India',
    weight: 54,
    medical_conditions: 'None',
    consent: true,

    donation_date: '2024-05-10',
    amount_ml: 350,
    status: 'collected',
    hemoglobin_level: 12.5,
    collection_center: 'Indore Blood Bank',
    remarks: 'First donation'
  }
];

const inventory = [
  { blood_group: 'A+', units_available: 12 },
  { blood_group: 'A-', units_available: 8  },
  { blood_group: 'B+', units_available: 10 },
  { blood_group: 'B-', units_available: 5  },
  { blood_group: 'AB+', units_available: 4 },
  { blood_group: 'AB-', units_available: 2 },
  { blood_group: 'O+', units_available: 15 },
  { blood_group: 'O-', units_available: 7  },
];

export { users, customers, invoices, revenue, donors, donations, inventory};
