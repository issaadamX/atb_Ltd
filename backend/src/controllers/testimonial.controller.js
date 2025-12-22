const prisma = require('../config/db');
const { sendSuccess, sendError } = require('../utils/response');

const getTestimonials = async (req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
    });

    sendSuccess(res, 'Testimonials retrieved successfully', testimonials);
  } catch (error) {
    console.error('Get testimonials error:', error);
    sendError(res, 500, 'Server error');
  }
};

const getTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const testimonial = await prisma.testimonial.findUnique({
      where: { id: parseInt(id) },
    });

    if (!testimonial) {
      return sendError(res, 404, 'Testimonial not found');
    }

    sendSuccess(res, 'Testimonial retrieved successfully', testimonial);
  } catch (error) {
    console.error('Get testimonial error:', error);
    sendError(res, 500, 'Server error');
  }
};

const createTestimonial = async (req, res) => {
  try {
    const { name, role, content, rating, type, videoUrl } = req.body;

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        role,
        content,
        rating: parseInt(rating),
        type,
        videoUrl,
      },
    });

    sendSuccess(res, 'Testimonial created successfully', testimonial, 201);
  } catch (error) {
    console.error('Create testimonial error:', error);
    sendError(res, 500, 'Server error');
  }
};

const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, content, rating, type, videoUrl } = req.body;

    const existingTestimonial = await prisma.testimonial.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingTestimonial) {
      return sendError(res, 404, 'Testimonial not found');
    }

    const testimonial = await prisma.testimonial.update({
      where: { id: parseInt(id) },
      data: {
        name,
        role,
        content,
        rating: parseInt(rating),
        type,
        videoUrl,
      },
    });

    sendSuccess(res, 'Testimonial updated successfully', testimonial);
  } catch (error) {
    console.error('Update testimonial error:', error);
    sendError(res, 500, 'Server error');
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const existingTestimonial = await prisma.testimonial.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingTestimonial) {
      return sendError(res, 404, 'Testimonial not found');
    }

    await prisma.testimonial.delete({
      where: { id: parseInt(id) },
    });

    sendSuccess(res, 'Testimonial deleted successfully');
  } catch (error) {
    console.error('Delete testimonial error:', error);
    sendError(res, 500, 'Server error');
  }
};

module.exports = {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
