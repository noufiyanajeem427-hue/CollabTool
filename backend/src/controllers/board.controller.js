const Board = require("../models/Board");

const createBoard = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Board title is required"
            });
        }

        const board = await Board.create({
            title,
            description,
            owner: req.user.userId,
            members: [req.user.userId]
        });

        res.status(201).json({
            message: "Board created successfully",
            board
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create board",
            error: error.message
        });
    }
};


const getBoards = async (req, res) => {
    try {
        const boards = await Board.find({
            members: req.user.userId
        })
        .populate("owner", "name email")
        .populate("members", "name email")
        .sort({ createdAt: -1 });

        res.status(200).json({
            boards
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to get boards",
            error: error.message
        });
    }
};


const getBoard = async (req, res) => {
    try {
        const board = await Board.findOne({
            _id: req.params.id,
            members: req.user.userId
        })
        .populate("owner", "name email")
        .populate("members", "name email");

        if (!board) {
            return res.status(404).json({
                message: "Board not found"
            });
        }

        res.status(200).json({
            board
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to get board",
            error: error.message
        });
    }
};


const updateBoard = async (req, res) => {
    try {
        const { title, description } = req.body;

        const board = await Board.findOne({
            _id: req.params.id,
            owner: req.user.userId
        });

        if (!board) {
            return res.status(404).json({
                message: "Board not found or you are not the owner"
            });
        }

        if (title !== undefined) {
            board.title = title;
        }

        if (description !== undefined) {
            board.description = description;
        }

        await board.save();

        res.status(200).json({
            message: "Board updated successfully",
            board
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update board",
            error: error.message
        });
    }
};


const deleteBoard = async (req, res) => {
    try {
        const board = await Board.findOneAndDelete({
            _id: req.params.id,
            owner: req.user.userId
        });

        if (!board) {
            return res.status(404).json({
                message: "Board not found or you are not the owner"
            });
        }

        res.status(200).json({
            message: "Board deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete board",
            error: error.message
        });
    }
};


module.exports = {
    createBoard,
    getBoards,
    getBoard,
    updateBoard,
    deleteBoard
};