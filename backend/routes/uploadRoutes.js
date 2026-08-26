const express = require("express");
const multer = require("multer");
const { PDFParse } = require("pdf-parse");
const { cleanText } = require("../utils/textProcessor");

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage()
});

router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                error: "Please upload a file."
            });
        }

        let text = "";

        // PDF
        if (req.file.mimetype === "application/pdf") {
    const parser = new PDFParse({
        data: req.file.buffer
    });

    const data = await parser.getText();

    text = data.text;

    await parser.destroy();
}

        // TXT
        else if (req.file.mimetype === "text/plain") {
            text = req.file.buffer.toString("utf-8");
        }

        // Unsupported file
        else {
            return res.status(400).json({
                error: "Only PDF and TXT files are allowed."
            });
        }

        res.json({
            filename: req.file.originalname,
            text: cleanText(text)
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

module.exports = router;