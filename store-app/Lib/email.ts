import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Send order notification to admin
export async function sendOrderEmail(orderData: any, emailContent: string, orderId: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: `${process.env.STORE_NAME || 'The Store'} <onboarding@resend.dev>`,
      to: [process.env.ADMIN_EMAIL!],
      subject: `🛒 New Order ${orderId} from ${orderData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd;">
          <div style="background-color: #007bff; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">🛒 New Order Received</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Order #${orderId}</p>
          </div>
          
          <div style="padding: 20px;">
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #495057; margin-top: 0; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
                👤 Customer Information
              </h3>
              <div style="display: grid; gap: 10px;">
                <p style="margin: 5px 0;"><strong>Name:</strong> ${orderData.name}</p>
                <p style="margin: 5px 0;"><strong>📧 Email:</strong> <a href="mailto:${orderData.email}">${orderData.email}</a></p>
                <p style="margin: 5px 0;"><strong>📞 Phone:</strong> <a href="tel:${orderData.phone}">${orderData.phone}</a></p>
                <p style="margin: 5px 0;"><strong>📍 Address:</strong> ${orderData.address}</p>
              </div>
            </div>

            <div style="background-color: #fff; padding: 20px; border: 2px solid #007bff; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #495057; margin-top: 0; border-bottom: 2px solid #28a745; padding-bottom: 10px;">
                📦 Order Details
              </h3>
              <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
                <thead>
                  <tr style="background-color: #007bff; color: white;">
                    <th style="padding: 12px; text-align: left;">Product</th>
                    <th style="padding: 12px; text-align: center;">Qty</th>
                    <th style="padding: 12px; text-align: right;">Unit Price</th>
                    <th style="padding: 12px; text-align: right;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${orderData.items.map((item: any, index: number) => `
                    <tr style="background-color: ${index % 2 === 0 ? '#f8f9fa' : '#ffffff'};">
                      <td style="padding: 12px; border-bottom: 1px solid #dee2e6; font-weight: 500;">${item.product.name}</td>
                      <td style="padding: 12px; text-align: center; border-bottom: 1px solid #dee2e6;">${item.quantity}</td>
                      <td style="padding: 12px; text-align: right; border-bottom: 1px solid #dee2e6;">$${item.product.price.toFixed(2)}</td>
                      <td style="padding: 12px; text-align: right; border-bottom: 1px solid #dee2e6; font-weight: 600;">$${(item.product.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </tbody>
                <tfoot>
                  <tr style="background-color: #28a745; color: white; font-weight: bold; font-size: 16px;">
                    <td colspan="3" style="padding: 15px; text-align: right;">TOTAL AMOUNT:</td>
                    <td style="padding: 15px; text-align: right;">$${orderData.total.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div style="background-color: #d4edda; border: 2px solid #c3e6cb; color: #155724; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #155724;">🎯 URGENT - Next Steps Required</h3>
              <div style="background-color: #ffffff; padding: 15px; border-radius: 5px; margin: 10px 0;">
                <p style="margin: 5px 0; font-size: 16px;"><strong>📞 Call Customer:</strong> <a href="tel:${orderData.phone}" style="color: #007bff; text-decoration: none; font-weight: bold;">${orderData.phone}</a></p>
                <p style="margin: 5px 0;"><strong>📅 Order Date:</strong> ${new Date().toLocaleString()}</p>
                <p style="margin: 5px 0;"><strong>📦 Total Items:</strong> ${orderData.items.reduce((count: number, item: any) => count + item.quantity, 0)} items</p>
                <p style="margin: 5px 0;"><strong>🆔 Order ID:</strong> ${orderId}</p>
              </div>
              <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 10px; border-radius: 5px; margin: 10px 0;">
                <p style="margin: 0; font-weight: bold;">⚠️ Remember to confirm:</p>
                <ul style="margin: 5px 0; padding-left: 20px;">
                  <li>Payment method and amount</li>
                  <li>Delivery address and timing</li>
                  <li>Product availability</li>
                </ul>
              </div>
            </div>
          </div>

          <div style="background-color: #333; color: white; text-align: center; padding: 15px;">
            <p style="margin: 0; font-size: 14px;">Order Management System - ${process.env.STORE_NAME || 'Your Store'}</p>
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



