const prisma = require('../config/db');
const { sendSuccess, sendError } = require('../utils/response');

const getServices = async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'desc' },
    });

    sendSuccess(res, 'Services retrieved successfully', services);
  } catch (error) {
    console.error('Get services error:', error);
    sendError(res, 500, 'Server error');
  }
};

const getService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await prisma.service.findUnique({
      where: { id: parseInt(id) },
    });

    if (!service) {
      return sendError(res, 404, 'Service not found');
    }

    sendSuccess(res, 'Service retrieved successfully', service);
  } catch (error) {
    console.error('Get service error:', error);
    sendError(res, 500, 'Server error');
  }
};

const createService = async (req, res) => {
  try {
    const { title, description, features, icon } = req.body;

    const service = await prisma.service.create({
      data: {
        title,
        description,
        features: JSON.parse(features || '[]'),
        icon,
      },
    });

    sendSuccess(res, 'Service created successfully', service, 201);
  } catch (error) {
    console.error('Create service error:', error);
    sendError(res, 500, 'Server error');
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, features, icon } = req.body;

    const existingService = await prisma.service.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingService) {
      return sendError(res, 404, 'Service not found');
    }

    const service = await prisma.service.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        features: JSON.parse(features || '[]'),
        icon,
      },
    });

    sendSuccess(res, 'Service updated successfully', service);
  } catch (error) {
    console.error('Update service error:', error);
    sendError(res, 500, 'Server error');
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const existingService = await prisma.service.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingService) {
      return sendError(res, 404, 'Service not found');
    }

    await prisma.service.delete({
      where: { id: parseInt(id) },
    });

    sendSuccess(res, 'Service deleted successfully');
  } catch (error) {
    console.error('Delete service error:', error);
    sendError(res, 500, 'Server error');
  }
};

module.exports = {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
};
