import nodemailer from 'nodemailer';

// Opret transporteren en gang, transporteren er den del der håndterer forbindelsen til SMTP serveren
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendNewsletterEmail = async (toEmail) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: toEmail,
      subject: 'Velkommen til nyhedsbrevet',
      html: `
        <h1>Tak for din tilmelding!</h1>
        <p>Vi bekræfter hermed, at din email <strong>${toEmail}</strong> er modtaget.</p>
      `,
    });
    return { success: true };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Mail service error:', error);
    return { success: false, error };
  }
};
