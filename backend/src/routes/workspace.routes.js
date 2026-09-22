const express = require("express");

const {
  createWorkspace,
  getWorkspaces,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
  addMember,
  removeMember
} = require("../controllers/workspaceController");

const router = express.Router();

router.post("/", createWorkspace);

router.get("/", getWorkspaces);

router.get("/:id", getWorkspaceById);

router.put("/:id", updateWorkspace);

router.delete("/:id", deleteWorkspace);

router.post("/:id/members", addMember);

router.delete("/:id/members", removeMember);

module.exports = router;