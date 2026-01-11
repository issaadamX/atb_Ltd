const { PrismaClient } = require('@prisma/client');
const { successResponse, errorResponse } = require('../utils/response');

const prisma = new PrismaClient();

const getServices = async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return successResponse(res, services);
  } catch (error) {
    return errorResponse(res, 'Failed to fetch services', 500);
  }
};

const getService = async (req, res) => {
  try {
    const service = await prisma.service.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!service) {
      return errorResponse(res, 'Service not found', 404);
    }
    return successResponse(res, service);
  } catch (error) {
    return errorResponse(res, 'Failed to fetch service', 500);
  }
};

const createService = async (req, res) => {
  try {
    const service = await prisma.service.create({
      data: req.body
    });
    return successResponse(res, service, 'Service created successfully', 201);
  } catch (error) {
    return errorResponse(res, 'Failed to create service', 500);
  }
};

const updateService = async (req, res) => {
  try {
    const service = await prisma.service.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    return successResponse(res, service, 'Service updated successfully');
  } catch (error) {
    return errorResponse(res, 'Failed to update service', 500);
  }
};

const deleteService = async (req, res) => {
  try {
    await prisma.service.delete({
      where: { id: parseInt(req.params.id) }
    });
    return successResponse(res, null, 'Service deleted successfully');
  } catch (error) {
    return errorResponse(res, 'Failed to delete service', 500);
  }
};

module.exports = {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
};