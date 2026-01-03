import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  message: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const gmailUser = Deno.env.get('GMAIL_USER');
    const gmailPassword = Deno.env.get('GMAIL_APP_PASSWORD');

    if (!gmailUser || !gmailPassword) {
      console.error('Gmail credentials not configured');
      throw new Error('Email service not configured');
    }

    const data: QuoteRequest = await req.json();
    console.log('Received quote request:', { name: data.name, email: data.email, eventType: data.eventType });

    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.eventType) {
      throw new Error('Missing required fields');
    }

    // Create SMTP client
    const client = new SMTPClient({
      connection: {
        hostname: "smtp.gmail.com",
        port: 465,
        tls: true,
        auth: {
          username: gmailUser,
          password: gmailPassword,
        },
      },
    });

    // Email content for the business owner
    const ownerEmailContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #0a1628 0%, #1a2d4a 100%); color: #d4a574; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #0a1628; }
    .value { color: #555; }
    .footer { text-align: center; margin-top: 20px; color: #888; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚢 Yeni Teklif Talebi</h1>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Ad Soyad:</span>
        <span class="value">${data.name}</span>
      </div>
      <div class="field">
        <span class="label">E-posta:</span>
        <span class="value">${data.email}</span>
      </div>
      <div class="field">
        <span class="label">Telefon:</span>
        <span class="value">${data.phone}</span>
      </div>
      <div class="field">
        <span class="label">Etkinlik Türü:</span>
        <span class="value">${data.eventType}</span>
      </div>
      <div class="field">
        <span class="label">Tarih:</span>
        <span class="value">${data.eventDate || 'Belirtilmedi'}</span>
      </div>
      <div class="field">
        <span class="label">Kişi Sayısı:</span>
        <span class="value">${data.guestCount || 'Belirtilmedi'}</span>
      </div>
      <div class="field">
        <span class="label">Mesaj:</span>
        <p class="value">${data.message || 'Mesaj yok'}</p>
      </div>
    </div>
    <div class="footer">
      <p>Bu talep web siteniz üzerinden gönderilmiştir.</p>
    </div>
  </div>
</body>
</html>
    `;

    // Email content for the customer (confirmation)
    const customerEmailContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #0a1628 0%, #1a2d4a 100%); color: #d4a574; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
    .footer { text-align: center; margin-top: 20px; color: #888; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚢 Talebiniz Alındı</h1>
    </div>
    <div class="content">
      <p>Sayın ${data.name},</p>
      <p>Teklif talebiniz başarıyla alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.</p>
      <p><strong>Talep Özeti:</strong></p>
      <ul>
        <li><strong>Etkinlik:</strong> ${data.eventType}</li>
        <li><strong>Tarih:</strong> ${data.eventDate || 'Belirtilmedi'}</li>
        <li><strong>Kişi Sayısı:</strong> ${data.guestCount || 'Belirtilmedi'}</li>
      </ul>
      <p>Bizi tercih ettiğiniz için teşekkür ederiz!</p>
    </div>
    <div class="footer">
      <p>İstanbul Boğazı'nda Unutulmaz Anılar</p>
    </div>
  </div>
</body>
</html>
    `;

    // Send email to business owner
    console.log('Sending email to business owner...');
    await client.send({
      from: gmailUser,
      to: gmailUser,
      subject: `🚢 Yeni Teklif Talebi: ${data.eventType} - ${data.name}`,
      content: "Yeni bir teklif talebi alındı.",
      html: ownerEmailContent,
    });

    // Send confirmation email to customer
    console.log('Sending confirmation email to customer...');
    await client.send({
      from: gmailUser,
      to: data.email,
      subject: "Talebiniz Alındı - İstanbul Boğazı Tekne Turu",
      content: "Teklif talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.",
      html: customerEmailContent,
    });

    await client.close();
    console.log('Emails sent successfully');

    return new Response(
      JSON.stringify({ success: true, message: 'Emails sent successfully' }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error sending email:', errorMessage);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
