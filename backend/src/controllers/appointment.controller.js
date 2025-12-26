const prisma = require('../config/db');
const transporter = require('../config/mail');
const { sendSuccess, sendError } = require('../utils/response');

const getAppointments = async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: 'desc' },
    });

    sendSuccess(res, 'Appointments retrieved successfully', appointments);
  } catch (error) {
    console.error('Get appointments error:', error);
    sendError(res, 500, 'Server error');
  }
};

const getAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await prisma.appointment.findUnique({
      where: { id: parseInt(id) },
    });

    if (!appointment) {
      return sendError(res, 404, 'Appointment not found');
    }

    sendSuccess(res, 'Appointment retrieved successfully', appointment);
  } catch (error) {
    console.error('Get appointment error:', error);
    sendError(res, 500, 'Server error');
  }
};

const createAppointment = async (req, res) => {
  try {
    const { fullName, email, phone, service, message } = req.body;

    console.log('Creating appointment for:', { fullName, email, phone, service, message });

    const appointment = await prisma.appointment.create({
      data: {
        fullName,
        email,
        phone,
        service,
        message,
        status: 'pending',
      },
    });

    console.log('Appointment created:', appointment);

    // Send email notification to admin
    try {
      console.log('Sending admin email to:', process.env.ADMIN_EMAIL);
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: 'New Appointment Request - ATB Ltd',
        html: `
          <h2>New Appointment Request</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Message:</strong> ${message || 'No message'}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        `,
      });
      console.log('Admin email sent successfully');
    } catch (emailError) {
      console.error('Admin email sending error:', emailError);
      // Don't fail the appointment creation if email fails
    }

    // Send confirmation email to user
    try {
      console.log('Sending user confirmation email to:', email);
      await transporter.sendMail({
        from: 'abc.sarl <' + process.env.EMAIL_USER + '>',
        to: email,
        subject: 'Confirmation de votre demande de consultation - ABC SARL',
        html: `
          <h2>Votre demande de consultation a été reçue</h2>
          <p>Cher(e) ${fullName},</p>
          <p>Nous avons bien reçu votre demande de consultation. Vous recevrez bientôt notre réponse.</p>
          <p><strong>Détails de votre demande :</strong></p>
          <ul>
            <li><strong>Nom :</strong> ${fullName}</li>
            <li><strong>Email :</strong> ${email}</li>
            <li><strong>Téléphone :</strong> ${phone || 'Non fourni'}</li>
            <li><strong>Service demandé :</strong> ${service}</li>
            <li><strong>Message :</strong> ${message || 'Aucun message'}</li>
            <li><strong>Date de la demande :</strong> ${new Date().toLocaleString()}</li>
          </ul>
          <p>Cordialement,<br>ABC SARL</p>
        `,
      });
      console.log('User confirmation email sent successfully');
    } catch (emailError) {
      console.error('User confirmation email sending error:', emailError);
      // Don't fail the appointment creation if email fails
    }

    sendSuccess(res, 'Appointment created successfully', appointment, 201);
  } catch (error) {
    console.error('Create appointment error:', error);
    sendError(res, 500, 'Server error');
  }
};

const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const existingAppointment = await prisma.appointment.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingAppointment) {
      return sendError(res, 404, 'Appointment not found');
    }

    const appointment = await prisma.appointment.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    // Send email to user based on status
    try {
      let subject = '';
      let html = '';

      switch (status) {
        case 'accepted':
          subject = 'Votre demande de consultation a été acceptée - ATB Ltd';
          html = `
            <h2>Félicitations ! Votre demande de consultation a été acceptée</h2>
            <p>Cher(e) ${appointment.fullName},</p>
            <p>Nous sommes heureux de vous informer que votre demande de consultation pour le service <strong>${appointment.service}</strong> a été <strong>acceptée</strong>.</p>
            <p><strong>Détails de votre demande :</strong></p>
            <ul>
              <li><strong>Nom :</strong> ${appointment.fullName}</li>
              <li><strong>Email :</strong> ${appointment.email}</li>
              <li><strong>Téléphone :</strong> ${appointment.phone || 'Non fourni'}</li>
              <li><strong>Service demandé :</strong> ${appointment.service}</li>
              <li><strong>Message :</strong> ${appointment.message || 'Aucun message'}</li>
              <li><strong>Date de la demande :</strong> ${new Date(appointment.createdAt).toLocaleString()}</li>
            </ul>
            <p>Notre équipe vous contactera bientôt pour organiser la consultation.</p>
            <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
            <p>Cordialement,<br>L'équipe ATB Ltd</p>
          `;
          break;

        case 'declined':
          subject = 'Mise à jour de votre demande de consultation - ATB Ltd';
          html = `
            <h2>Mise à jour de votre demande de consultation</h2>
            <p>Cher(e) ${appointment.fullName},</p>
            <p>Nous vous informons que votre demande de consultation pour le service <strong>${appointment.service}</strong> a été <strong>refusée</strong>.</p>
            <p><strong>Détails de votre demande :</strong></p>
            <ul>
              <li><strong>Nom :</strong> ${appointment.fullName}</li>
              <li><strong>Email :</strong> ${appointment.email}</li>
              <li><strong>Téléphone :</strong> ${appointment.phone || 'Non fourni'}</li>
              <li><strong>Service demandé :</strong> ${appointment.service}</li>
              <li><strong>Message :</strong> ${appointment.message || 'Aucun message'}</li>
              <li><strong>Date de la demande :</strong> ${new Date(appointment.createdAt).toLocaleString()}</li>
            </ul>
            <p>Nous vous remercions pour votre intérêt. N'hésitez pas à nous contacter pour toute autre demande.</p>
            <p>Cordialement,<br>L'équipe ATB Ltd</p>
          `;
          break;

        case 'postponed':
          subject = 'Mise à jour de votre demande de consultation - ATB Ltd';
          html = `
            <h2>Mise à jour de votre demande de consultation</h2>
            <p>Cher(e) ${appointment.fullName},</p>
            <p>Nous vous informons que votre demande de consultation pour le service <strong>${appointment.service}</strong> a été <strong>reportée</strong>.</p>
            <p><strong>Détails de votre demande :</strong></p>
            <ul>
              <li><strong>Nom :</strong> ${appointment.fullName}</li>
              <li><strong>Email :</strong> ${appointment.email}</li>
              <li><strong>Téléphone :</strong> ${appointment.phone || 'Non fourni'}</li>
              <li><strong>Service demandé :</strong> ${appointment.service}</li>
              <li><strong>Message :</strong> ${appointment.message || 'Aucun message'}</li>
              <li><strong>Date de la demande :</strong> ${new Date(appointment.createdAt).toLocaleString()}</li>
            </ul>
            <p>Notre équipe vous contactera dès que possible pour reprogrammer la consultation.</p>
            <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
            <p>Cordialement,<br>L'équipe ATB Ltd</p>
          `;
          break;

        default:
          // No email for other statuses like 'pending'
          break;
      }

      if (subject && html) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: appointment.email,
          subject,
          html,
        });
      }
    } catch (emailError) {
      console.error('Status update email sending error:', emailError);
      // Don't fail the appointment update if email fails
    }

    sendSuccess(res, 'Appointment updated successfully', appointment);
  } catch (error) {
    console.error('Update appointment error:', error);
    sendError(res, 500, 'Server error');
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const existingAppointment = await prisma.appointment.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingAppointment) {
      return sendError(res, 404, 'Appointment not found');
    }

    await prisma.appointment.delete({
      where: { id: parseInt(id) },
    });

    sendSuccess(res, 'Appointment deleted successfully');
  } catch (error) {
    console.error('Delete appointment error:', error);
    sendError(res, 500, 'Server error');
  }
};

module.exports = {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
