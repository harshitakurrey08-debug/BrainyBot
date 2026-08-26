const Session = require("../models/Session");

// Create a new session
exports.createSession = async (req, res) => {
    try {
        const { type, inputText, output } = req.body;

        // Check required fields
        if (!type || !inputText || !output) {
            return res.status(400).json({
                error: "type, inputText and output are required."
            });
        }

        // Create session for logged-in user
        const session = await Session.create({
            user: req.userId,
            type,
            inputText,
            output
        });

        res.status(201).json({
            message: "Session saved successfully",
            session
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

// Get all sessions of logged-in user
exports.getSessions = async (req, res) => {
    try {
        const sessions = await Session.find({
            user: req.userId
        }).sort({
            createdAt: -1
        });

        res.json({
            sessions
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};
// Get one session by ID
exports.getSessionById = async (req, res) => {
    try {
        const session = await Session.findOne({
            _id: req.params.id,
            user: req.userId
        });

        if (!session) {
            return res.status(404).json({
                error: "Session not found."
            });
        }

        res.json({
            session
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};