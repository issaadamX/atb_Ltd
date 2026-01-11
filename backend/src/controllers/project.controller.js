const { PrismaClient } = require('@prisma/client');
const { successResponse, errorResponse } = require('../utils/response');

const prisma = new PrismaClient();

const getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { visibility: 'published' },
      orderBy: { createdAt: 'desc' }
    });
    return successResponse(res, projects);
  } catch (error) {
    return errorResponse(res, 'Failed to fetch projects', 500);
  }
};

const getProject = async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!project) {
      return errorResponse(res, 'Project not found', 404);
    }
    return successResponse(res, project);
  } catch (error) {
    return errorResponse(res, 'Failed to fetch project', 500);
  }
};

const createProject = async (req, res) => {
  try {
    const project = await prisma.project.create({
      data: req.body
    });
    return successResponse(res, project, 'Project created successfully', 201);
  } catch (error) {
    return errorResponse(res, 'Failed to create project', 500);
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await prisma.project.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    return successResponse(res, project, 'Project updated successfully');
  } catch (error) {
    return errorResponse(res, 'Failed to update project', 500);
  }
};

const deleteProject = async (req, res) => {
  try {
    await prisma.project.delete({
      where: { id: parseInt(req.params.id) }
    });
    return successResponse(res, null, 'Project deleted successfully');
  } catch (error) {
    return errorResponse(res, 'Failed to delete project', 500);
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};