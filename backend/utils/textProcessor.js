exports.cleanText = (text) => {
    if (!text) {
        return "";
    }

    return text
        .replace(/\s+/g, " ")
        .replace(/\n+/g, "\n")
        .trim();
};