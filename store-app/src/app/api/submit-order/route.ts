import { NextRequest, NextResponse } from 'next/server';
import { OrderForm } from " ../../../Lib/types";

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderForm = await request.json();
    
    // Create email content
    const emailContent = `
New Order Received:

Customer Information:
- Name: ${orderData.name}
- Email: ${orderData.email}
- Phone: ${orderData.phone}
- Address: ${orderData.address}

Order Details:
${orderData.items.map(item => 
  `- ${item.product.name} x ${item.quantity} = ${(item.product.price * item.quantity).toFixed(2)}`
).join('\n')}

Total Amount: ${orderData.total.toFixed(2)}
Total Items: ${orderData.items.reduce((count, item) => count + item.quantity, 0)}

---
This order was submitted on ${new Date().toLocaleString()}
Please call the customer at ${orderData.phone} to confirm payment.
    `;

    // In a real application, you would send this email using a service like:
    // - Nodemailer with SMTP
    // - SendGrid
    // - AWS SES
    // - Resend
    
    // For demo purposes, we'll just log it
    console.log('Order Email Content:', emailContent);
    
    // Here you would typically:
    // 1. Save order to database
    // 2. Send email notification
    // 3. Send SMS to admin
    // 4. Update inventory
    
    return NextResponse.json({ 
      success: true, 
      message: 'Order submitted successfully' 
    });
    
  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process order' },
      { status: 500 }
    );
  }
}