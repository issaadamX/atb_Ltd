const { PrismaClient } = require('@prisma/client');
const { successResponse, errorResponse } = require('../utils/response');

const prisma = new PrismaClient();

const getTestimonials = async (req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return successResponse(res, testimonials);
  } catch (error) {
    return errorResponse(res, 'Failed to fetch testimonials', 500);
  }
};

const getTestimonial = async (req, res) => {
  try {
    const testimonial = await prisma.testimonial.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!testimonial) {
      return errorResponse(res, 'Testimonial not found', 404);
    }
    return successResponse(res, testimonial);
  } catch (error) {
    return errorResponse(res, 'Failed to fetch testimonial', 500);
  }
};

const createTestimonial = async (req, res) => {
  try {
    const testimonial = await prisma.testimonial.create({
      data: req.body
    });
    return successResponse(res, testimonial, 'Testimonial created successfully', 201);
  } catch (error) {
    return errorResponse(res, 'Failed to create testimonial', 500);
  }
};

const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await prisma.testimonial.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    return successResponse(res, testimonial, 'Testimonial updated successfully');
  } catch (error) {
    return errorResponse(res, 'Failed to update testimonial', 500);
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    await prisma.testimonial.delete({
      where: { id: parseInt(req.params.id) }
    });
    return successResponse(res, null, 'Testimonial deleted successfully');
  } catch (error) {
    return errorResponse(res, 'Failed to delete testimonial', 500);
  }
};

module.exports = {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};