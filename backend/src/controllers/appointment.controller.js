const { PrismaClient } = require('@prisma/client');
const { successResponse, errorResponse } = require('../utils/response');
const emailService = require('../services/email.service');

let prisma;
try {
  prisma = new PrismaClient();
} catch (error) {
  console.error('Prisma initialization error:', error);
}

const appointmentController = {
  // Get all appointments
  getAppointments: async (req, res) => {
    try {
      const { status, page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * limit;

      const where = status ? { status } : {};

      const [appointments, total] = await Promise.all([
        prisma.appointment.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          skip: parseInt(skip),
          take: parseInt(limit),
        }),
        prisma.appointment.count({ where })
      ]);

      return successResponse(res, {
        appointments,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Get appointments error:', error);
      return errorResponse(res, 'Failed to fetch appointments', 500);
    }
  },

  // Get appointment by ID
  getAppointment: async (req, res) => {
    try {
      const { id } = req.params;
      const appointment = await prisma.appointment.findUnique({
        where: { id: parseInt(id) }
      });

      if (!appointment) {
        return errorResponse(res, 'Appointment not found', 404);
      }

      return successResponse(res, appointment);
    } catch (error) {
      console.error('Get appointment error:', error);
      return errorResponse(res, 'Failed to fetch appointment', 500);
    }
  },

  // Create appointment (from frontend booking form)
  createAppointment: async (req, res) => {
    try {
      console.log('Create appointment request received:', req.body);
      
      if (!prisma) {
        console.log('Prisma client not available');
        return errorResponse(res, 'Database connection not available', 500);
      }

      const { fullName, email, phone, service, message } = req.body;
      
      console.log('Creating appointment with data:', { fullName, email, phone, service, message });

      const appointment = await prisma.appointment.create({
        data: {
          fullName,
          email,
          phone,
          service,
          message,
          status: 'pending'
        }
      });
      
      console.log('Appointment created successfully:', appointment);

      // Send confirmation email
      const emailResult = await emailService.sendAppointmentConfirmation({
        fullName,
        email,
        service,
        message
      });
      
      if (emailResult.success) {
        console.log('Confirmation email sent successfully');
      } else {
        console.log('Email not sent:', emailResult.reason || emailResult.error);
      }

      return successResponse(res, appointment, 'Appointment request submitted successfully', 201);
    } catch (error) {
      console.error('Create appointment error:', error);
      return errorResponse(res, 'Failed to create appointment', 500);
    }
  },

  // Update appointment
  updateAppointment: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const appointment = await prisma.appointment.update({
        where: { id: parseInt(id) },
        data: {
          ...updateData,
          updatedAt: new Date()
        }
      });

      return successResponse(res, appointment, 'Appointment updated successfully');
    } catch (error) {
      console.error('Update appointment error:', error);
      return errorResponse(res, 'Failed to update appointment', 500);
    }
  },

  // Delete appointment
  deleteAppointment: async (req, res) => {
    try {
      const { id } = req.params;

      await prisma.appointment.delete({
        where: { id: parseInt(id) }
      });

      return successResponse(res, null, 'Appointment deleted successfully');
    } catch (error) {
      console.error('Delete appointment error:', error);
      return errorResponse(res, 'Failed to delete appointment', 500);
    }
  },

  // Accept appointment
  acceptAppointment: async (req, res) => {
    try {
      const { id } = req.params;
      const { scheduledDate, scheduledTime, message } = req.body;

      let scheduledAt = null;
      if (scheduledDate && scheduledTime) {
        scheduledAt = new Date(`${scheduledDate}T${scheduledTime}`);
      }

      const appointment = await prisma.appointment.update({
        where: { id: parseInt(id) },
        data: {
          status: 'accepted',
          scheduledAt,
          adminNotes: message,
          updatedAt: new Date()
        }
      });

      // Send acceptance email
      const emailResult = await emailService.sendAppointmentAccepted({
        fullName: appointment.fullName,
        email: appointment.email,
        service: appointment.service,
        scheduledDate,
        scheduledTime,
        message
      });
      
      if (emailResult.success) {
        console.log('Acceptance email sent successfully');
      } else {
        console.log('Email not sent:', emailResult.reason || emailResult.error);
      }

      return successResponse(res, appointment, 'Appointment accepted successfully');
    } catch (error) {
      console.error('Accept appointment error:', error);
      return errorResponse(res, 'Failed to accept appointment', 500);
    }
  },

  // Decline appointment
  declineAppointment: async (req, res) => {
    try {
      const { id } = req.params;
      const { reason } = req.body;

      const appointment = await prisma.appointment.update({
        where: { id: parseInt(id) },
        data: {
          status: 'declined',
          adminNotes: reason,
          updatedAt: new Date()
        }
      });

      // Create notification
      await prisma.notification.create({
        data: {
          type: 'appointment',
          title: 'Appointment Declined',
          message: `Appointment for ${appointment.fullName} has been declined`,
          relatedId: appointment.id
        }
      });

      return successResponse(res, appointment, 'Appointment declined successfully');
    } catch (error) {
      console.error('Decline appointment error:', error);
      return errorResponse(res, 'Failed to decline appointment', 500);
    }
  },

  // Postpone appointment
  postponeAppointment: async (req, res) => {
    try {
      const { id } = req.params;
      const { newDate, newTime } = req.body;

      let scheduledAt = null;
      if (newDate && newTime) {
        scheduledAt = new Date(`${newDate}T${newTime}`);
      }

      const appointment = await prisma.appointment.update({
        where: { id: parseInt(id) },
        data: {
          status: 'postponed',
          scheduledAt,
          updatedAt: new Date()
        }
      });

      // Create notification
      await prisma.notification.create({
        data: {
          type: 'appointment',
          title: 'Appointment Postponed',
          message: `Appointment for ${appointment.fullName} has been postponed`,
          relatedId: appointment.id
        }
      });

      return successResponse(res, appointment, 'Appointment postponed successfully');
    } catch (error) {
      console.error('Postpone appointment error:', error);
      return errorResponse(res, 'Failed to postpone appointment', 500);
    }
  }
};

module.exports = appointmentController;