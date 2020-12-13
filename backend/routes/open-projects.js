const router = require("express").Router();
const createError = require("http-errors");
const { isValidObjectId } = require("mongoose");
const OpenProject = require("../model/OpenProject");
const { getToken, verifyToken } = require("../middleware");

router.get("/", getAllProjects);
router.post("/", getToken, verifyToken, createProjects);
router.delete("/:projectId", getToken, verifyToken, deleteProject);

async function getAllProjects(req, res, next) {
  try {
    const projects = await OpenProject.find();
    res.status(200).json({ projects });
  } catch (err) {
    next(err);
  }
}

async function createProjects(req, res, next) {
  try {
    const { repoName, repoOwnerName } = req.body;
    const { userId } = req.locals;

    const project = await OpenProject.create({
      repoName,
      repoOwnerName,
      chinguOwnerId: userId,
    });
    if (!project) throw createError(400, "Error adding your repo");

    res.status(200).json({ message: "Added your repo" });
  } catch (err) {
    next(err);
  }
}

async function deleteProject(req, res, next) {
  try {
    const { projectId } = req.params;

    const isValid = isValidObjectId(projectId);
    if (!isValid) throw createError(400, "Invalid projectId format");

    const project = await OpenProject.findByIdAndDelete(projectId);
    if (!project) throw createError(400, "Error adding your repo");

    res.status(200).json({ message: "Added your repo" });
  } catch (err) {
    next(err);
  }
}

module.exports = router;
