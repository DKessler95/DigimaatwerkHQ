import { Resend } from 'resend';

export interface EmailData {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  message: string;
}

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmailViaResend(data: EmailData): Promise<void> {
  const { name, email, company, projectType, message } = data;

  try {
    // Send notification email to Digimaatwerk
    const adminEmail = await resend.emails.send({
      from: 'Website Contact <noreply@digimaatwerk.nl>',
      to: ['info@digimaatwerk.nl'], // Admin email - domain is now verified!
      subject: `🔔 Nieuw Contact Formulier van ${name}`,
      html: createAdminEmailHTML(data),
      replyTo: email, // Reply goes to the actual customer
    });

    console.log('Admin notification result:', adminEmail);
    console.log('Admin notification sent:', adminEmail.data?.id || 'ERROR');

    // Send confirmation email to user
    const userEmail = await resend.emails.send({
      from: 'Digimaatwerk <noreply@digimaatwerk.nl>',
      to: [email],
      subject: '✅ Bedankt voor je bericht - Digimaatwerk',
      html: createUserConfirmationHTML(data),
    });

    console.log('User confirmation result:', userEmail);
    console.log('User confirmation sent:', userEmail.data?.id || 'ERROR');
    console.log('✅ Emails sent successfully via Resend');

  } catch (error) {
    console.error('Resend email error:', error);
    throw error;
  }
}

function createAdminEmailHTML(data: EmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; }
            .info-box { background: white; padding: 15px; border-radius: 6px; margin: 15px 0; }
            .message-box { background: white; padding: 20px; border-left: 4px solid #2563eb; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2 style="margin: 0;">Nieuw Contact Formulier</h2>
                <p style="margin: 5px 0 0 0; opacity: 0.9;">Via digimaatwerk.nl</p>
            </div>
            <div class="content">
                <div class="info-box">
                    <h3 style="margin-top: 0; color: #2563eb;">Contact Gegevens</h3>
                    <p><strong>Naam:</strong> ${data.name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
                    ${data.company ? `<p><strong>Bedrijf:</strong> ${data.company}</p>` : ''}
                    ${data.projectType ? `<p><strong>Project Type:</strong> ${data.projectType}</p>` : ''}
                </div>
                
                <div class="message-box">
                    <h3 style="margin-top: 0; color: #334155;">Bericht</h3>
                    <p style="line-height: 1.6;">${data.message.replace(/\n/g, '<br>')}</p>
                </div>
                
                <div style="margin-top: 30px; padding: 15px; background-color: #e2e8f0; border-radius: 6px; text-align: center;">
                    <p style="margin: 0; font-size: 14px; color: #64748b;">
                        Reageer direct op deze email om contact op te nemen met ${data.name}
                    </p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
}

function createUserConfirmationHTML(data: EmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 500px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { color: #2563eb; font-size: 24px; font-weight: bold; }
            .content { background: #f8fafc; padding: 25px; border-radius: 8px; }
            .message-preview { background: white; padding: 15px; border-radius: 6px; margin: 20px 0; font-style: italic; }
            .signature { margin-top: 30px; padding-top: 20px; border-top: 2px solid #e2e8f0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">Digimaatwerk</div>
                <p style="color: #64748b; margin: 5px 0 0 0;">Digitale Transformatie & AI Automatisering</p>
            </div>
            
            <div class="content">
                <h2 style="color: #2563eb; margin-top: 0;">Bedankt ${data.name}!</h2>
                
                <p>We hebben je bericht ontvangen en waarderen je interesse in onze diensten. Ons team neemt binnen 24 uur contact met je op om je vraag te beantwoorden.</p>
                
                <div class="message-preview">
                    <strong>Je bericht:</strong><br>
                    "${data.message}"
                </div>
                
                <p>Heb je een urgente vraag? Bel ons direct op <strong>+31 (0)6 37353483</strong> of stuur een WhatsApp bericht.</p>
                
                <div class="signature">
                    <p><strong>Met vriendelijke groet,</strong></p>
                    <p><strong>Damian & Elfie</strong><br>
                    <em>Oprichter & Trouwe hond</em><br>
                    Digimaatwerk</p>
                    
                    <p style="font-size: 14px; color: #64748b; margin-top: 20px;">
                        📧 info@digimaatwerk.nl<br>
                        🌐 www.digimaatwerk.nl
                    </p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
}
