const express = require("express");

const {
    createBoard,
    getBoards,
    getBoard,
    updateBoard,
    deleteBoard
} = require("../controllers/boardController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createBoard);

router.get("/", authMiddleware, getBoards);

router.get("/:id", authMiddleware, getBoard);

router.put("/:id", authMiddleware, updateBoard);

router.delete("/:id", authMiddleware, deleteBoard);

module.exports = router;