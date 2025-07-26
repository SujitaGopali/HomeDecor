const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

const router = express.Router();

// Create email transporter (configure based on your email service)
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// @route   POST /api/contact
// @desc    Send contact form email
// @access  Public
router.post('/', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('subject').trim().isLength({ min: 3 }).withMessage('Subject must be at least 3 characters'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
  body('phone').optional().isMobilePhone().withMessage('Please enter a valid phone number'),
  body('projectType').optional().isString(),
  body('budget').optional().isString(),
  body('preferredContact').optional().isIn(['email', 'phone'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      name,
      email,
      phone,
      subject,
      message,
      projectType,
      budget,
      preferredContact
    } = req.body;

    // Create email content
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      <p><strong>Subject:</strong> ${subject}</p>
      ${projectType ? `<p><strong>Project Type:</strong> ${projectType}</p>` : ''}
      ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
      ${preferredContact ? `<p><strong>Preferred Contact:</strong> ${preferredContact}</p>` : ''}
      
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, '<br>')}</p>
      
      <hr>
      <p><small>Sent from Home Decor Contact Form at ${new Date().toLocaleString()}</small></p>
    `;

    // Auto-reply content
    const autoReplyContent = `
      <h2>Thank you for contacting Home Decor!</h2>
      <p>Dear ${name},</p>
      
      <p>We have received your inquiry and will get back to you within 24 hours. Here's a summary of your submission:</p>
      
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Subject:</strong> ${subject}</p>
        ${projectType ? `<p><strong>Project Type:</strong> ${projectType}</p>` : ''}
        ${budget ? `<p><strong>Budget Range:</strong> ${budget}</p>` : ''}
        <p><strong>Message:</strong> ${message}</p>
      </div>
      
      <p>Our team of expert interior designers is excited to help transform your space. We'll review your requirements and match you with the perfect designer for your project.</p>
      
      <p>In the meantime, feel free to browse our <a href="${process.env.FRONTEND_URL}/gallery">portfolio</a> to see examples of our work.</p>
      
      <p>Best regards,<br>
      The Home Decor Team</p>
      
      <hr>
      <p style="font-size: 12px; color: #666;">
        Home Decor Interior Management System<br>
        Email: hello@homedecor.com<br>
        Phone: +1 (555) 123-4567
      </p>
    `;

    try {
      const transporter = createTransporter();

      // Send notification email to admin
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send to admin email
        subject: `New Contact Form: ${subject}`,
        html: emailContent,
        replyTo: email
      });

      // Send auto-reply to user
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank you for contacting Home Decor',
        html: autoReplyContent
      });

      res.json({
        success: true,
        message: 'Your message has been sent successfully! We will get back to you within 24 hours.'
      });

    } catch (emailError) {
      console.error('Email sending error:', emailError);
      
      // Even if email fails, we can still log the contact for manual follow-up
      res.json({
        success: true,
        message: 'Your message has been received! We will get back to you within 24 hours.'
      });
    }

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

// @route   POST /api/contact/newsletter
// @desc    Subscribe to newsletter
// @access  Public
router.post('/newsletter', [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address',
        errors: errors.array()
      });
    }

    const { email, name } = req.body;

    // In a real application, you would save this to a newsletter database
    // and integrate with an email marketing service like Mailchimp, SendGrid, etc.

    try {
      const transporter = createTransporter();

      // Send welcome email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to Home Decor Newsletter!',
        html: `
          <h2>Welcome to Home Decor!</h2>
          ${name ? `<p>Dear ${name},</p>` : '<p>Hello!</p>'}
          
          <p>Thank you for subscribing to our newsletter. You'll now receive:</p>
          <ul>
            <li>Latest interior design trends</li>
            <li>Exclusive design tips from our experts</li>
            <li>Special offers and promotions</li>
            <li>Featured project showcases</li>
          </ul>
          
          <p>Stay tuned for amazing content!</p>
          
          <p>Best regards,<br>
          The Home Decor Team</p>
        `
      });

      // Notify admin of new subscriber
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'New Newsletter Subscription',
        html: `
          <h3>New Newsletter Subscriber</h3>
          <p><strong>Email:</strong> ${email}</p>
          ${name ? `<p><strong>Name:</strong> ${name}</p>` : ''}
          <p><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</p>
        `
      });

    } catch (emailError) {
      console.error('Newsletter email error:', emailError);
    }

    res.json({
      success: true,
      message: 'Successfully subscribed to our newsletter!'
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

module.exports = router;