import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, mobile, message, subject, lang } = req.body;

  if (!name || !email || !mobile || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Configure your SMTP transport (use your real credentials)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Debug logging for SMTP credentials
  console.log('SMTP_USER:', process.env.SMTP_USER);
  console.log('SMTP_PASS:', process.env.SMTP_PASS);

  try {
    await transporter.sendMail({
      from: `"${name}" <info@masterclean-care.com>`,
      to: process.env.CONTACT_EMAIL || 'info@masterclean-care.com',
      replyTo: email,
      subject: subject || 'Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Mobile:</strong> ${mobile}</p><p><strong>Message:</strong><br/>${message}</p>`
    });
    // Send a formal confirmation copy to the user in the correct language
    let userSubject, userText, userHtml;
    if (lang === 'ar') {
      userSubject = 'تم استلام رسالتك | ماستر كلين كير';
      userText = `عزيزي/عزيزتي ${name},\n\nشكرًا لتواصلك مع ماستر كلين كير. لقد استلمنا رسالتك وسنقوم بالرد عليك في أقرب وقت ممكن.\n\nمع أطيب التحيات،\nفريق ماستر كلين كير\ninfo@masterclean-care.com\n+966561062662`;
      userHtml = `<p>عزيزي/عزيزتي ${name}،</p><p>شكرًا لتواصلك مع <b>ماستر كلين كير</b>. لقد استلمنا رسالتك وسنقوم بالرد عليك في أقرب وقت ممكن.</p><p>مع أطيب التحيات،<br/>فريق ماستر كلين كير<br/>info@masterclean-care.com<br/>+966561062662</p>`;
    } else {
      userSubject = 'We have received your message | Master Clean Care';
      userText = `Dear ${name},\n\nThank you for contacting Master Clean Care. We have received your message and will get back to you as soon as possible.\n\nBest regards,\nMaster Clean Care Team\ninfo@masterclean-care.com\n+966561062662`;
      userHtml = `<p>Dear ${name},</p><p>Thank you for contacting <b>Master Clean Care</b>. We have received your message and will get back to you as soon as possible.</p><p>Best regards,<br/>Master Clean Care Team<br/>info@masterclean-care.com<br/>+966561062662</p>`;
    }
    await transporter.sendMail({
      from: 'Master Clean Care <info@masterclean-care.com>',
      to: email,
      subject: userSubject,
      text: userText,
      html: userHtml
    });
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
} 