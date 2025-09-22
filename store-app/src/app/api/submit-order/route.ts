import { NextRequest, NextResponse } from 'next/server';
import { OrderForm } from "../../../../Lib/types";
import { sendOrderEmail } from '../../../../Lib/email';

// Email validation function
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone validation function - Updated to handle Ghana numbers
function isValidPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  // Allow numbers starting with + or 0, minimum 7 digits
  const phoneRegex = /^(\+?[\d]{7,15}|0[\d]{6,14})$/;
  return phoneRegex.test(cleanPhone);
}

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderForm = await request.json();
    
    // Validate required fields
    if (!orderData.name || !orderData.email || !orderData.phone || !orderData.address) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Missing required fields: name, email, phone, and address are required'
        },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(orderData.email)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email address format'
        },
        { status: 400 }
      );
    }

    // Validate phone format
    if (!isValidPhone(orderData.phone)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid phone number format'
        },
        { status: 400 }
      );
    }

    // Validate order items
    if (!orderData.items || orderData.items.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Order must contain at least one item'
        },
        { status: 400 }
      );
    }

    // Generate unique order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    
    // Create email content for admin
    const adminEmailContent = `
New Order Received - ${orderId}

Customer Information:
- Name: ${orderData.name}
- Email: ${orderData.email}
- Phone: ${orderData.phone}
- Address: ${orderData.address}

Order Details:
${orderData.items.map(item => 
  `- ${item.product.name} x ${item.quantity} = $${(item.product.price * item.quantity).toFixed(2)}`
).join('\n')}

Total Amount: $${orderData.total.toFixed(2)}
Total Items: ${orderData.items.reduce((count, item) => count + item.quantity, 0)}

Order ID: ${orderId}
Order Date: ${new Date().toLocaleString()}

NEXT STEPS: Please call the customer at ${orderData.phone} to confirm payment and delivery.
    `;

    // Send email to admin only
    console.log('Sending admin notification email...');
    const adminEmailResult = await sendOrderEmail(orderData, adminEmailContent, orderId);

    if (!adminEmailResult.success) {
      console.error('Admin email sending failed:', adminEmailResult.error);
      // Still continue with success since order was received
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Order submitted successfully. We will contact you within 24 hours to confirm payment and delivery details.',
      orderId: orderId,
      adminEmailSent: adminEmailResult.success,
      nextStep: 'You will receive a phone call within 24 hours to confirm your order and arrange payment.'
    });
    
  } catch (error) {
    console.error('Error processing order:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to process order',
        error: process.env.NODE_ENV === 'development' ? errorMessage : 'Internal server error'
      },
      { status: 500 }
    );
  }
}