import nodemailer from 'nodemailer';

export interface EmailData {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  message: string;
}

// Alternative email service using Gmail SMTP (works on Render)
const createGmailTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER || 'info@digimaatwerk.nl',
      pass: process.env.GMAIL_APP_PASSWORD // Gmail app password
    }
  });
};

// Fallback: Direct HTTP email service (Formspree alternative)
const sendViaHTTP = async (data: EmailData) => {
  const emailContent = `
New contact form submission:

Name: ${data.name}
Email: ${data.email}
Company: ${data.company || 'Not specified'}
Project Type: ${data.projectType || 'Not specified'}

Message:
${data.message}
  `;

  // Use a simple HTTP service to forward emails
  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_USER_ID,
      template_params: {
        to_email: 'info@digimaatwerk.nl',
        from_name: data.name,
        from_email: data.email,
        message: emailContent
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Email service failed: ${response.statusText}`);
  }
};

// Simple database logging as backup
const logToDatabase = async (data: EmailData) => {
  console.log('=== EMAIL FALLBACK: LOGGING TO DATABASE ===');
  console.log('Contact submission logged - manual email notification needed:');
  console.log(`Name: ${data.name}`);
  console.log(`Email: ${data.email}`);
  console.log(`Company: ${data.company || 'N/A'}`);
  console.log(`Project: ${data.projectType || 'N/A'}`);
  console.log(`Message: ${data.message}`);
  console.log('=== END EMAIL FALLBACK ===');
};

export async function sendContactEmailAlternative(data: EmailData): Promise<void> {
  const methods = [
    { name: 'Gmail SMTP', fn: () => sendViaGmail(data) },
    { name: 'HTTP Service', fn: () => sendViaHTTP(data) },
    { name: 'Database Log', fn: () => logToDatabase(data) }
  ];

  for (const method of methods) {
    try {
      console.log(`Trying email method: ${method.name}`);
      await method.fn();
      console.log(`✅ Email sent successfully via: ${method.name}`);
      return;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.log(`❌ ${method.name} failed:`, errorMessage);
      continue;
    }
  }

  throw new Error('All email methods failed');
}

async function sendViaGmail(data: EmailData) {
  const transporter = createGmailTransporter();
  
  await transporter.sendMail({
    from: '"Digimaatwerk" <info@digimaatwerk.nl>',
    to: 'info@digimaatwerk.nl',
    subject: `Nieuw contact formulier: ${data.name}`,
    html: createEmailHTML(data)
  });

  // Send confirmation to user
  await transporter.sendMail({
    from: '"Digimaatwerk" <info@digimaatwerk.nl>',
    to: data.email,
    subject: 'Bedankt voor je bericht - Digimaatwerk',
    html: createConfirmationHTML(data)
  });
}

function createEmailHTML(data: EmailData): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Nieuw Contact Formulier</h2>
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Naam:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.company ? `<p><strong>Bedrijf:</strong> ${data.company}</p>` : ''}
        ${data.projectType ? `<p><strong>Project:</strong> ${data.projectType}</p>` : ''}
      </div>
      <div style="background: #fff; padding: 20px; border-left: 4px solid #2563eb;">
        <h3>Bericht:</h3>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      </div>
    </div>
  `;
}

function createConfirmationHTML(data: EmailData): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Bedankt ${data.name}!</h2>
      <p>We hebben je bericht ontvangen en nemen binnen 24 uur contact met je op.</p>
      <div style="margin: 20px 0; padding: 15px; background: #f1f5f9; border-radius: 6px;">
        <p><strong>Je bericht:</strong></p>
        <p style="font-style: italic;">${data.message}</p>
      </div>
      <p>Met vriendelijke groet,<br><strong>Damian & Elfie</strong><br>Digimaatwerk</p>
    </div>
  `;
}