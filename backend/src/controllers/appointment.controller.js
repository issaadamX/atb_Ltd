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

    // Send email notification to admin
    try {
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
    } catch (emailError) {
      console.error('Email sending error:', emailError);
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
