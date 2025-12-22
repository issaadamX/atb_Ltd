const prisma = require('../config/db');
const { uploadToCloudinary, deleteFromCloudinary } = require('../services/cloudinary.service');
const { sendSuccess, sendError } = require('../utils/response');

const getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });

    sendSuccess(res, 'Projects retrieved successfully', projects);
  } catch (error) {
    console.error('Get projects error:', error);
    sendError(res, 500, 'Server error');
  }
};

const getProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
    });

    if (!project) {
      return sendError(res, 404, 'Project not found');
    }

    sendSuccess(res, 'Project retrieved successfully', project);
  } catch (error) {
    console.error('Get project error:', error);
    sendError(res, 500, 'Server error');
  }
};

const createProject = async (req, res) => {
  try {
    const { title, type, description, year, location } = req.body;
    let imageUrl = null;

    // Handle image upload if provided
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'projects');
      imageUrl = result.secure_url;
    }

    const project = await prisma.project.create({
      data: {
        title,
        type,
        description,
        image: imageUrl,
        year: parseInt(year),
        location,
      },
    });

    sendSuccess(res, 'Project created successfully', project, 201);
  } catch (error) {
    console.error('Create project error:', error);
    sendError(res, 500, 'Server error');
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, type, description, year, location } = req.body;
    let imageUrl = null;

    const existingProject = await prisma.project.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProject) {
      return sendError(res, 404, 'Project not found');
    }

    // Handle image upload if provided
    if (req.file) {
      // Delete old image if exists
      if (existingProject.image) {
        const publicId = existingProject.image.split('/').pop().split('.')[0];
        await deleteFromCloudinary(`projects/${publicId}`);
      }

      const result = await uploadToCloudinary(req.file.buffer, 'projects');
      imageUrl = result.secure_url;
    }

    const project = await prisma.project.update({
      where: { id: parseInt(id) },
      data: {
        title,
        type,
        description,
        image: imageUrl || existingProject.image,
        year: parseInt(year),
        location,
      },
    });

    sendSuccess(res, 'Project updated successfully', project);
  } catch (error) {
    console.error('Update project error:', error);
    sendError(res, 500, 'Server error');
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProject = await prisma.project.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProject) {
      return sendError(res, 404, 'Project not found');
    }

    // Delete image from Cloudinary if exists
    if (existingProject.image) {
      const publicId = existingProject.image.split('/').pop().split('.')[0];
      await deleteFromCloudinary(`projects/${publicId}`);
    }

    await prisma.project.delete({
      where: { id: parseInt(id) },
    });

    sendSuccess(res, 'Project deleted successfully');
  } catch (error) {
    console.error('Delete project error:', error);
    sendError(res, 500, 'Server error');
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
