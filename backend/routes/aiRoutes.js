const express = require("express");

const router = express.Router();

const ai = require("../controllers/aiController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/summarize",authMiddleware, ai.summarize);
router.post("/flashcards",authMiddleware, ai.flashcards);
router.post("/quiz",authMiddleware, ai.quiz);

module.exports = router;