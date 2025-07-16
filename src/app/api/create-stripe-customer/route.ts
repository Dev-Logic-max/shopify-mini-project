import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-06-30.basil', // Use the latest stable API version
});

export async function POST(request: Request) {
  try {
    const { email, fullName } = await request.json();

    const customer = await stripe.customers.create({
      email,
      name: fullName,
      description: 'New customer from Lost Library signup',
    });

    return NextResponse.json({ customer }, { status: 200 });
  } catch (error: unknown) {
    console.error('Stripe customer creation failed:', error);
    return NextResponse.json({ error: 'Failed to create Stripe customer' }, { status: 500 });
  }
}