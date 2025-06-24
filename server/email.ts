import nodemailer from 'nodemailer';

// Strato SMTP configuration
const transporter = nodemailer.createTransporter({
  host: 'smtp.strato.de',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'info@digimaatwerk.nl', // Your email
    pass: process.env.EMAIL_PASSWORD // Email password from environment
  }
});

export interface EmailData {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  message: string;
}

export async function sendContactEmail(data: EmailData): Promise<void> {
  const { name, email, company, projectType, message } = data;
  
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
        Nieuw contact formulier bericht
      </h2>
      
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #334155;">Contact Details</h3>
        <p><strong>Naam:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Bedrijf:</strong> ${company}</p>` : ''}
        ${projectType ? `<p><strong>Project Type:</strong> ${projectType}</p>` : ''}
      </div>
      
      <div style="background-color: #fff; padding: 20px; border-left: 4px solid #2563eb; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #334155;">Bericht</h3>
        <p style="line-height: 1.6; color: #475569;">${message.replace(/\n/g, '<br>')}</p>
      </div>
      
      <div style="margin-top: 30px; padding: 15px; background-color: #f1f5f9; border-radius: 6px;">
        <p style="margin: 0; font-size: 14px; color: #64748b;">
          Dit bericht is verzonden via het contact formulier op digimaatwerk.nl
        </p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"Digimaatwerk Contact Form" <info@digimaatwerk.nl>`,
    to: 'info@digimaatwerk.nl',
    replyTo: email,
    subject: `Nieuw contact bericht van ${name}`,
    html: htmlContent,
    text: `
Nieuw contact formulier bericht

Naam: ${name}
Email: ${email}
${company ? `Bedrijf: ${company}` : ''}
${projectType ? `Project Type: ${projectType}` : ''}

Bericht:
${message}

---
Dit bericht is verzonden via het contact formulier op digimaatwerk.nl
    `.trim()
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully for contact from ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}

// Test email function
export async function sendTestEmail(): Promise<void> {
  const testData: EmailData = {
    name: 'Test User',
    email: 'test@example.com',
    company: 'Test Company',
    projectType: 'Web Development',
    message: 'Dit is een test e-mail om de Strato mailserver configuratie te testen.'
  };

  await sendContactEmail(testData);
}

// Verify transporter configuration
export async function verifyEmailConfig(): Promise<boolean> {
  try {
    await transporter.verify();
    console.log('Email server is ready to take our messages');
    return true;
  } catch (error) {
    console.error('Email server configuration error:', error);
    return false;
  }
}