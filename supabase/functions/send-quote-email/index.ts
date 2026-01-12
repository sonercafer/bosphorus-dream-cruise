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
  cateringOption: string;
  selectedMenu: string;
  message: string;
}

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

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

    // Format catering option for display
    const cateringDisplay = data.cateringOption === 'with-food' || data.cateringOption === 'yemekli' 
      ? 'Yemekli' 
      : 'Yemeksiz';

    // Map menu ids to readable titles (frontend sends ids like: klasik, premium, vip)
    const menuTitleMap: Record<string, string> = {
      klasik: 'Klasik Menü',
      premium: 'Premium Menü',
      vip: 'VIP Menü',
    };

    const rawMenu = (data.selectedMenu ?? '').trim();
    const menuDisplayRaw = rawMenu ? (menuTitleMap[rawMenu] ?? rawMenu) : 'Belirtilmedi';

    // Escape all user-controlled content before embedding into HTML
    const safe = {
      name: escapeHtml(data.name),
      email: escapeHtml(data.email),
      phone: escapeHtml(data.phone),
      eventType: escapeHtml(data.eventType),
      eventDate: escapeHtml(data.eventDate || 'Belirtilmedi'),
      guestCount: escapeHtml(data.guestCount || 'Belirtilmedi'),
      catering: escapeHtml(cateringDisplay),
      menu: escapeHtml(menuDisplayRaw),
      messageHtml: escapeHtml(data.message || 'Mesaj yok').replace(/\r?\n/g, '<br />'),
    };

    const includeMenu = cateringDisplay === 'Yemekli' && rawMenu.length > 0;

    const ownerMenuRow = includeMenu
      ? `
        <tr>
          <td style="padding:8px 0; font-weight:700; color:#0a1628; width:180px;">📋 Seçilen Menü</td>
          <td style="padding:8px 0; color:#333;">${safe.menu}</td>
        </tr>`
      : '';

    // Email content for the business owner (inline styles for maximum email-client compatibility)
    const ownerEmailContent = `<!doctype html>
<html>
  <body style="margin:0; padding:0; background:#f5f5f5;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background:#ffffff; border-radius:12px; overflow:hidden; font-family:Arial, sans-serif;">
            <tr>
              <td style="padding:18px 20px; background:#0a1628; color:#ffffff;">
                <div style="font-size:18px; font-weight:700;">🚢 Yeni Teklif Talebi</div>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 20px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:8px 0; font-weight:700; color:#0a1628; width:180px;">Ad Soyad</td>
                    <td style="padding:8px 0; color:#333;">${safe.name}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; font-weight:700; color:#0a1628;">E-posta</td>
                    <td style="padding:8px 0; color:#333;">${safe.email}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; font-weight:700; color:#0a1628;">Telefon</td>
                    <td style="padding:8px 0; color:#333;">${safe.phone}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; font-weight:700; color:#0a1628;">Etkinlik Türü</td>
                    <td style="padding:8px 0; color:#333;">${safe.eventType}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; font-weight:700; color:#0a1628;">Tarih</td>
                    <td style="padding:8px 0; color:#333;">${safe.eventDate}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; font-weight:700; color:#0a1628;">Kişi Sayısı</td>
                    <td style="padding:8px 0; color:#333;">${safe.guestCount}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; font-weight:700; color:#0a1628;">🍽️ Yemek Seçeneği</td>
                    <td style="padding:8px 0; color:#333;">${safe.catering}</td>
                  </tr>
                  ${ownerMenuRow}
                  <tr>
                    <td style="padding:12px 0 6px; font-weight:700; color:#0a1628; vertical-align:top;">Mesaj</td>
                    <td style="padding:12px 0 6px; color:#333;">${safe.messageHtml}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 20px; background:#fafafa; color:#777; font-size:12px;">
                Bu talep web siteniz üzerinden gönderilmiştir.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

    const customerMenuLine = includeMenu
      ? `<li><strong>Seçilen Menü:</strong> ${safe.menu}</li>`
      : '';

    // Email content for the customer (confirmation)
    const customerEmailContent = `<!doctype html>
<html>
  <body style="margin:0; padding:0; background:#f5f5f5;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background:#ffffff; border-radius:12px; overflow:hidden; font-family:Arial, sans-serif;">
            <tr>
              <td style="padding:18px 20px; background:#0a1628; color:#ffffff;">
                <div style="font-size:18px; font-weight:700;">🚢 Talebiniz Alındı</div>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 20px; color:#333; line-height:1.6;">
                <p style="margin:0 0 12px;">Sayın ${safe.name},</p>
                <p style="margin:0 0 12px;">Teklif talebiniz başarıyla alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.</p>
                <p style="margin:0 0 8px;"><strong>Talep Özeti:</strong></p>
                <ul style="margin:0; padding-left:18px;">
                  <li><strong>Etkinlik:</strong> ${safe.eventType}</li>
                  <li><strong>Tarih:</strong> ${safe.eventDate}</li>
                  <li><strong>Kişi Sayısı:</strong> ${safe.guestCount}</li>
                  <li><strong>Yemek Seçeneği:</strong> ${safe.catering}</li>
                  ${customerMenuLine}
                </ul>
                <p style="margin:12px 0 0;">Bizi tercih ettiğiniz için teşekkür ederiz!</p>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 20px; background:#fafafa; color:#777; font-size:12px;">
                İstanbul Boğazı'nda Unutulmaz Anılar
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

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
