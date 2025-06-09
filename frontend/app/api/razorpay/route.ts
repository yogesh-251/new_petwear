import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
  const body = await req.json();

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });

  const total = body.items.reduce(
    (sum: number, item: any) => sum + item.price/100 * item.quantity,
    0
  );

  const options = {
    amount: total * 100, // Amount in paise
    currency: 'INR',
    receipt: `order_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);

  return NextResponse.json({
    key: process.env.RAZORPAY_KEY_ID,
    order,
  });
}
