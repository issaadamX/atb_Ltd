const prisma = require('../config/db');
const { sendSuccess, sendError } = require('../utils/response');

const getStats = async (req, res) => {
  try {
    // Get counts for dashboard stats
    const [projectsCount, servicesCount, testimonialsCount, appointmentsCount, pendingAppointmentsCount] = await Promise.all([
      prisma.project.count(),
      prisma.service.count(),
      prisma.testimonial.count(),
      prisma.appointment.count(),
      prisma.appointment.count({ where: { status: 'pending' } }),
    ]);

    const stats = {
      projects: projectsCount,
      services: servicesCount,
      testimonials: testimonialsCount,
      appointments: appointmentsCount,
      pendingAppointments: pendingAppointmentsCount,
    };

    sendSuccess(res, 'Dashboard stats retrieved successfully', stats);
  } catch (error) {
    console.error('Get stats error:', error);
    sendError(res, 500, 'Server error');
  }
};

const getRecentAppointments = async (req, res) => {
  try {
    const recentAppointments = await prisma.appointment.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        fullName: true,
        email: true,
        service: true,
        status: true,
        createdAt: true,
      },
    });

    sendSuccess(res, 'Recent appointments retrieved successfully', recentAppointments);
  } catch (error) {
    console.error('Get recent appointments error:', error);
    sendError(res, 500, 'Server error');
  }
};

const getAppointmentStats = async (req, res) => {
  try {
    const [pending, confirmed, completed, cancelled] = await Promise.all([
      prisma.appointment.count({ where: { status: 'pending' } }),
      prisma.appointment.count({ where: { status: 'confirmed' } }),
      prisma.appointment.count({ where: { status: 'completed' } }),
      prisma.appointment.count({ where: { status: 'cancelled' } }),
    ]);

    const stats = {
      pending,
      confirmed,
      completed,
      cancelled,
      total: pending + confirmed + completed + cancelled,
    };

    sendSuccess(res, 'Appointment stats retrieved successfully', stats);
  } catch (error) {
    console.error('Get appointment stats error:', error);
    sendError(res, 500, 'Server error');
  }
};

module.exports = {
  getStats,
  getRecentAppointments,
  getAppointmentStats,
};
