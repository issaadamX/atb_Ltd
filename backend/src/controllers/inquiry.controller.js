const { PrismaClient } = require('@prisma/client');
const { successResponse, errorResponse } = require('../utils/response');

const prisma = new PrismaClient();

const inquiryController = {
  // Get all inquiries
  getAllInquiries: async (req, res) => {
    try {
      const { status, page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * limit;

      const where = status ? { status } : {};

      const [inquiries, total] = await Promise.all([
        prisma.inquiry.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          skip: parseInt(skip),
          take: parseInt(limit),
        }),
        prisma.inquiry.count({ where })
      ]);

      return successResponse(res, {
        inquiries,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Get inquiries error:', error);
      return errorResponse(res, 'Failed to fetch inquiries', 500);
    }
  },

  // Get inquiry by ID
  getInquiryById: async (req, res) => {
    try {
      const { id } = req.params;
      const inquiry = await prisma.inquiry.findUnique({
        where: { id: parseInt(id) }
      });

      if (!inquiry) {
        return errorResponse(res, 'Inquiry not found', 404);
      }

      return successResponse(res, inquiry);
    } catch (error) {
      console.error('Get inquiry error:', error);
      return errorResponse(res, 'Failed to fetch inquiry', 500);
    }
  },

  // Update inquiry status
  updateInquiryStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status, response } = req.body;

      const inquiry = await prisma.inquiry.update({
        where: { id: parseInt(id) },
        data: {
          status,
          response,
          updatedAt: new Date()
        }
      });

      return successResponse(res, inquiry, 'Inquiry updated successfully');
    } catch (error) {
      console.error('Update inquiry error:', error);
      return errorResponse(res, 'Failed to update inquiry', 500);
    }
  },

  // Create inquiry (from frontend contact form)
  createInquiry: async (req, res) => {
    try {
      const { name, email, phone, subject, message } = req.body;

      const inquiry = await prisma.inquiry.create({
        data: {
          name,
          email,
          phone,
          subject,
          message,
          status: 'new'
        }
      });

      return successResponse(res, inquiry, 'Inquiry submitted successfully', 201);
    } catch (error) {
      console.error('Create inquiry error:', error);
      return errorResponse(res, 'Failed to create inquiry', 500);
    }
  },

  // Delete inquiry
  deleteInquiry: async (req, res) => {
    try {
      const { id } = req.params;

      await prisma.inquiry.delete({
        where: { id: parseInt(id) }
      });

      return successResponse(res, null, 'Inquiry deleted successfully');
    } catch (error) {
      console.error('Delete inquiry error:', error);
      return errorResponse(res, 'Failed to delete inquiry', 500);
    }
  }
};

module.exports = inquiryController;