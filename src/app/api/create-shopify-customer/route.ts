import { NextResponse } from 'next/server';
import axios from 'axios';

const shopifyBaseUrl = `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2025-07`;
const shopifyHeaders = {
  'Content-Type': 'application/json',
  'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN || '',
};

export async function POST(request: Request) {
  try {
    const { email, fullName } = await request.json();

    const response = await axios.post(
      `${shopifyBaseUrl}/customers.json`,
      {
        customer: {
          email,
          first_name: fullName.split(' ')[0] || '',
          last_name: fullName.split(' ')[1] || '',
          tags: 'new_customer',
          verified_email: true,
        },
      },
      { headers: shopifyHeaders }
    );

    return NextResponse.json({ customer: response.data.customer }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof axios.AxiosError) {
      console.error('Shopify customer creation failed:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      return NextResponse.json({ error: 'Failed to create Shopify customer' }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}