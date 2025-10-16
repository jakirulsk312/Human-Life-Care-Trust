// const Project = require("../models/Project");

// // Get all projects
// exports.getProjects = async (req, res) => {
//   try {
//     const projects = await Project.find().sort({ createdAt: -1 });
//     res.status(200).json({ data: projects });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to fetch projects." });
//   }
// };

// // Get project by slug
// exports.getProjectBySlug = async (req, res) => {
//   try {
//     const project = await Project.findOne({ slug: req.params.slug });
//     if (!project) return res.status(404).json({ message: "Project not found" });
//     res.status(200).json({ data: project });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to fetch project." });
//   }
// };

// // Add new project
// exports.addProject = async (req, res) => {
//   try {
//     const { title, slug, description, images, category } = req.body;

//     if (!title || !slug || !description || !category) {
//       return res.status(400).json({ message: "Title, Slug, Description & Category are required." });
//     }

//     // Optional: check for duplicate slug
//     const existing = await Project.findOne({ slug });
//     if (existing) return res.status(400).json({ message: "Slug already exists." });

//     const newProject = new Project({ title, slug, description, images, category });
//     await newProject.save();
//     res.status(201).json({ data: newProject });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to add project." });
//   }
// };

// // Update project
// exports.updateProject = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updated = await Project.findByIdAndUpdate(id, req.body, { new: true });
//     if (!updated) return res.status(404).json({ message: "Project not found." });
//     res.status(200).json({ data: updated });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to update project." });
//   }
// };

// // Delete project
// exports.deleteProject = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await Project.findByIdAndDelete(id);
//     if (!deleted) return res.status(404).json({ message: "Project not found." });
//     res.status(200).json({ message: "Project deleted successfully." });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to delete project." });
//   }
// };




///===============================================

// const Project = require("../models/Project");

// // Get all projects
// exports.getProjects = async (req, res) => {
//   try {
//     const projects = await Project.find().sort({ createdAt: -1 });
//     res.status(200).json({ data: projects });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to fetch projects." });
//   }
// };

// // Get project by category
// exports.getProjectByCategory = async (req, res) => {
//   try {
//     const { category } = req.params;
//     const project = await Project.findOne({ category });
//     if (!project) return res.status(404).json({ data: [] });
//     res.status(200).json({ data: [project] });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ data: [] });
//   }
// };

// // Add or update images
// exports.addOrUpdateProject = async (req, res) => {
//   try {
//     const { category, images } = req.body;
//     if (!category || !images || images.length === 0) {
//       return res.status(400).json({ message: "Category and images are required" });
//     }

//     const updated = await Project.findOneAndUpdate(
//       { category },
//       { $set: { images } },
//       { new: true, upsert: true }
//     );

//     res.status(200).json({ message: "Project saved successfully", data: updated });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to save project" });
//   }
// };

// // Delete a project
// exports.deleteProject = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await Project.findByIdAndDelete(id);
//     if (!deleted) return res.status(404).json({ message: "Project not found." });
//     res.status(200).json({ message: "Project deleted successfully." });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to delete project." });
//   }
// };
    