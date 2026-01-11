const transporter = require('../config/mail');

const emailService = {
  sendAppointmentConfirmation: async (appointmentData) => {
    try {
      const { fullName, email, service, message } = appointmentData;
      
      const mailOptions = {
        from: process.env.EMAIL_FROM || 'noreply@abc-sarl.com',
        to: email,
        subject: 'Confirmation de votre demande de rendez-vous - ABC.sarl',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #f97316;">Confirmation de rendez-vous</h2>
            <p>Bonjour ${fullName},</p>
            <p>Nous avons bien reçu votre demande de rendez-vous pour le service: <strong>${service}</strong></p>
            <p><strong>Votre message:</strong> ${message}</p>
            <p>Notre équipe examinera votre demande et vous contactera sous peu pour confirmer les détails.</p>
            <p>Merci de votre confiance.</p>
            <hr>
            <p style="color: #666; font-size: 12px;">ABC.sarl - Votre partenaire construction</p>
          </div>
        `
      };

      if (process.env.EMAIL_HOST && process.env.EMAIL_USER) {
        await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent to:', email);
        return { success: true };
      } else {
        console.log('Email not configured, skipping email send');
        return { success: false, reason: 'Email not configured' };
      }
    } catch (error) {
      console.error('Email send error:', error);
      return { success: false, error: error.message };
    }
  },

  sendAppointmentAccepted: async (appointmentData) => {
    try {
      const { fullName, email, service, scheduledDate, scheduledTime, message } = appointmentData;
      
      const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('fr-FR', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      };
      
      const mailOptions = {
        from: process.env.EMAIL_FROM || 'noreply@abc-sarl.com',
        to: email,
        subject: 'Rendez-vous accepté - ABC.sarl',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #22c55e;">✅ Rendez-vous Accepté</h2>
            <p>Bonjour ${fullName},</p>
            <p>Excellente nouvelle ! Votre demande de rendez-vous a été <strong>acceptée</strong>.</p>
            
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #0369a1; margin-top: 0;">Détails du rendez-vous</h3>
              <p><strong>Service:</strong> ${service}</p>
              ${scheduledDate ? `<p><strong>Date:</strong> ${formatDate(scheduledDate)}</p>` : ''}
              ${scheduledTime ? `<p><strong>Heure:</strong> ${scheduledTime}</p>` : ''}
              ${message ? `<p><strong>Note de l'équipe:</strong> ${message}</p>` : ''}
            </div>
            
            <p>Nous avons hâte de vous rencontrer et de discuter de votre projet.</p>
            <p>Si vous avez des questions ou devez modifier ce rendez-vous, n'hésitez pas à nous contacter.</p>
            
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #92400e;"><strong>📞 Contact:</strong> ${process.env.ADMIN_EMAIL || 'contact@abc-sarl.com'}</p>
            </div>
            
            <p>Cordialement,<br>L'équipe ABC.sarl</p>
            <hr>
            <p style="color: #666; font-size: 12px;">ABC.sarl - Votre partenaire construction</p>
          </div>
        `
      };

      if (process.env.EMAIL_HOST && process.env.EMAIL_USER) {
        await transporter.sendMail(mailOptions);
        console.log('Acceptance email sent to:', email);
        return { success: true };
      } else {
        console.log('Email not configured, skipping email send');
        return { success: false, reason: 'Email not configured' };
      }
    } catch (error) {
      console.error('Email send error:', error);
      return { success: false, error: error.message };
    }
  }
};

module.exports = emailService;