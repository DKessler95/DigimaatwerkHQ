import nodemailer from 'nodemailer';

// Strato SMTP configuration
const transporter = nodemailer.createTransport({
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
  
  // Email to Digimaatwerk
  const adminHtmlContent = `
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

  // Email to user (confirmation)
  const userHtmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
        Bedankt voor uw bericht!
      </h2>
      
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p>Beste ${name},</p>
        <p>Dank je wel voor je bericht. We hebben je vraag ontvangen en zullen zo spoedig mogelijk contact met je opnemen.</p>
        <p>Dit is een automatisch bevestigingsbericht. Je hoeft hier niet op te reageren.</p>
      </div>
      
      <div style="background-color: #fff; padding: 20px; border-left: 4px solid #2563eb; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #334155;">Jouw bericht:</h3>
        <p style="line-height: 1.6; color: #475569;">${message.replace(/\n/g, '<br>')}</p>
      </div>
      
      <div style="margin-top: 30px; padding: 20px; background-color: #2563eb; color: white; border-radius: 8px;">
        <h3 style="margin-top: 0; color: white;">Contact informatie</h3>
        <p style="margin-bottom: 5px;">📧 info@digimaatwerk.nl</p>
        <p style="margin-bottom: 5px;">🌐 www.digimaatwerk.nl</p>
        <p style="margin-bottom: 0;">📍 Star Numanstraat 79a, 9714JL Groningen</p>
      </div>
      
      <div style="margin-top: 20px; padding: 15px; background-color: #f1f5f9; border-radius: 6px; text-align: center;">
        <p style="margin: 0; font-size: 14px; color: #64748b;">
          Met vriendelijke groet,<br>
          <strong>Team Digimaatwerk</strong>
        </p>
      </div>
    </div>
  `;

  try {
    // Send email to Digimaatwerk
    const adminMailOptions = {
      from: `"Digimaatwerk Contact Form" <info@digimaatwerk.nl>`,
      to: 'info@digimaatwerk.nl',
      replyTo: email,
      subject: `Nieuw contact bericht van ${name}`,
      html: adminHtmlContent,
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

    // Send confirmation email to user
    const userMailOptions = {
      from: `"Digimaatwerk" <info@digimaatwerk.nl>`,
      to: email,
      subject: 'Bevestiging: We hebben je bericht ontvangen',
      html: userHtmlContent,
      text: `
Beste ${name},

Dank je wel voor je bericht. We hebben je vraag ontvangen en zullen zo spoedig mogelijk contact met je opnemen.

Dit is een automatisch bevestigingsbericht. Je hoeft hier niet op te reageren.

Jouw bericht:
${message}

Contact informatie:
Email: info@digimaatwerk.nl
Website: www.digimaatwerk.nl
Adres: Star Numanstraat 79a, 9714JL Groningen

Met vriendelijke groet,
Team Digimaatwerk
      `.trim()
    };

    console.log('Attempting to send emails...');
    console.log('Admin email to:', adminMailOptions.to);
    console.log('User email to:', userMailOptions.to);

    // Send both emails
    const [adminResult, userResult] = await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    console.log('Admin email result:', adminResult.messageId);
    console.log('User email result:', userResult.messageId);
    console.log(`Emails sent successfully for contact from ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
    if (error instanceof Error) {
      console.error('Email error details:', {
        name: error.name,
        message: error.message,
        code: (error as any).code,
        command: (error as any).command
      });
    }
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
    console.log('SMTP Config:', {
      host: 'smtp.strato.de',
      port: 465,
      secure: true,
      user: 'info@digimaatwerk.nl'
    });
    return true;
  } catch (error) {
    console.error('Email server configuration error:', error);
    return false;
  }
}