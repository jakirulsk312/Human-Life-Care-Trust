const Member = require("../models/Member");

// Get all members
exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch members" });
  }
};

// Add a new member
exports.addMember = async (req, res) => {
  try {
    const { name, professionDesignation, ngoDesignation } = req.body;
    const newMember = new Member({ name, professionDesignation, ngoDesignation });
    await newMember.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(500).json({ error: "Failed to add member" });
  }
};

// Update member
exports.updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMember = await Member.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedMember);
  } catch (err) {
    res.status(500).json({ error: "Failed to update member" });
  }
};

// Delete member
exports.deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    await Member.findByIdAndDelete(id);
    res.json({ message: "Member deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete member" });
  }
};
