const { generateAI } = require("../utils/aiService");
const Session = require("../models/Session");

exports.summarize = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || text.trim() === "") {
            return res.status(400).json({
                error: "Please provide some text."
            });
        }

        const prompt = `Summarize this in simple bullet points:\n${text}`;

        const result = await generateAI(prompt);

        // Save summary to MongoDB
        const session = await Session.create({
            user: req.userId,
            type: "summary",
            inputText: text,
            output: result
        });

        res.json({
            summary: result,
            sessionId: session._id
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

exports.flashcards = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || text.trim() === "") {
            return res.status(400).json({
                error: "Please provide some text."
            });
        }

        const prompt = `
Create 5 study flashcards from the following notes.

Return ONLY valid JSON.
Do not add markdown or explanations.

Use exactly this format:

[
    {
        "question": "Question here",
        "answer": "Answer here"
    }
]

Notes:
${text}
`;

        const result = await generateAI(prompt);

        let flashcards;

        try {
            flashcards = JSON.parse(result);
        } catch (error) {
            return res.status(500).json({
                error: "AI returned invalid JSON",
                raw: result
            });
        }

        // Save flashcards to MongoDB
        const session = await Session.create({
            user: req.userId,
            type: "flashcards",
            inputText: text,
            output: flashcards
        });

        res.json({
            flashcards: flashcards,
            sessionId: session._id
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

exports.quiz = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || text.trim() === "") {
            return res.status(400).json({
                error: "Please provide some text."
            });
        }

        const prompt = `
Create 5 multiple-choice questions from the following notes.

Return ONLY valid JSON.
Do not add markdown or explanations.

Use exactly this format:

[
    {
        "question": "Question here",
        "options": [
            "Option A",
            "Option B",
            "Option C",
            "Option D"
        ],
        "answer": "Correct option here"
    }
]

Notes:
${text}
`;

        const result = await generateAI(prompt);

        let quiz;

        try {
            quiz = JSON.parse(result);
        } catch (error) {
            return res.status(500).json({
                error: "AI returned invalid JSON",
                raw: result
            });
        }

        // Save quiz to MongoDB
        const session = await Session.create({
            user: req.userId,
            type: "quiz",
            inputText: text,
            output: quiz
        });

        res.json({
            quiz: quiz,
            sessionId: session._id
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};