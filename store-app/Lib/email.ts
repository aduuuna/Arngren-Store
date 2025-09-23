import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Send order notification to admin
export async function sendOrderEmail(orderData: any, emailContent: string, orderId: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: `${process.env.STORE_NAME || 'The Store'} <onboarding@resend.dev>`,
      to: [process.env.ADMIN_EMAIL!],
      subject: `New Order from ${orderData.name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          
          <!-- Header -->
          <div style="padding: 32px 24px; border-bottom: 1px solid #e5e7eb;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #111827;">Order ID - ${orderId}</h1>
            <p style="margin: 8px 0 0 0; color: #6b7280; font-size: 14px;">${new Date().toLocaleString()}</p>
          </div>
          
          <!-- Customer Information -->
          <div style="padding: 24px;">
            <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #111827;">Customer Information</h2>
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px 0; font-size: 14px, color: #111827;"><strong>Name:</strong> ${orderData.name}</p>
              <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${orderData.email}" style="color: #2563eb; text-decoration: none;">${orderData.email}</a></p>
              <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Phone:</strong> <a href="tel:${orderData.phone}" style="color: #2563eb; text-decoration: none;">${orderData.phone}</a></p>
              <p style="margin: 0; font-size: 14px, color: #111827;"><strong>Address:</strong> ${orderData.address}</p>
            </div>
          </div>

          <!-- Order Details -->
          <div style="padding: 0 24px 24px 24px;">
            <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #111827;">Order Details</h2>
            <div style="border: 1px solid #e5e7eb; border-radius: 8px;">
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background-color: #f9fafb;">
                    <th style="padding: 12px 16px; text-align: left; font-size: 14px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Product</th>
                    <th style="padding: 12px 16px; text-align: center; font-size: 14px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Quantity</th>
                    <th style="padding: 12px 16px; text-align: right; font-size: 14px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${orderData.items.map((item: any, index: number) => `
                    <tr style="${index < orderData.items.length - 1 ? 'border-bottom: 1px solid #f3f4f6;' : ''}">
                      <td style="padding: 12px 16px; font-size: 14px; color: #111827;">${item.product.name}</td>
                      <td style="padding: 12px 16px; text-align: center; font-size: 14px; color: #111827;">${item.quantity}</td>
                      <td style="padding: 12px 16px; text-align: right; font-size: 14px; color: #111827;">$${item.product.price.toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            
            <!-- Total below table -->
            <div style="margin-top: 16px; text-align: left;">
              <p style="margin: 0; font-size: 18px; font-weight: 700; color: #111827;">
                Total: $${orderData.total.toFixed(2)}
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div style="padding: 20px 24px; border-top: 1px solid #e5e7eb; background-color: #f9fafb;">
            <p style="margin: 0; font-size: 12px; color: #6b7280; text-align: center;">
              ${process.env.STORE_NAME || 'Your Store'} Order Management
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Failed to send admin email:', error);
      return { success: false, error: error.message };
    }

    console.log('Admin email sent successfully:', data?.id);
    return { success: true, messageId: data?.id };
  } catch (error: any) {
    console.error('Failed to send admin email:', error);
    return { success: false, error: error.message };
  }
}