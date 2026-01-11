const { PrismaClient } = require('@prisma/client');
const { successResponse, errorResponse } = require('../utils/response');

const prisma = new PrismaClient();

const dashboardController = {
  getStats: async (req, res) => {
    try {
      const [
        projectsCount,
        servicesCount,
        testimonialsCount,
        appointmentsStats
      ] = await Promise.all([
        prisma.project.count(),
        prisma.service.count(),
        prisma.testimonial.count(),
        prisma.appointment.groupBy({
          by: ['status'],
          _count: true
        })
      ]);

      const totalAppointments = await prisma.appointment.count();
      const pendingAppointments = await prisma.appointment.count({
        where: { status: 'pending' }
      });

      const appointmentsByStatus = appointmentsStats.reduce((acc, item) => {
        acc[item.status] = item._count;
        return acc;
      }, {});

      const stats = {
        projects: projectsCount,
        services: servicesCount,
        testimonials: testimonialsCount,
        appointments: {
          total: totalAppointments,
          pending: appointmentsByStatus.pending || 0,
          accepted: appointmentsByStatus.accepted || 0,
          declined: appointmentsByStatus.declined || 0,
          postponed: appointmentsByStatus.postponed || 0,
          today: 0,
          thisWeek: 0,
          thisMonth: 0
        },
        pendingAppointments
      };

      return successResponse(res, stats);
    } catch (error) {
      console.error('Dashboard stats error:', error);
      return errorResponse(res, 'Failed to fetch dashboard stats', 500);
    }
  }
};

module.exports = dashboardController;