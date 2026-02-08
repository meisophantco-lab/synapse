import express from "express";
import { sendToGemini } from "../services/geminiService.js";
import { updateContext, getContext } from "../utils/contextManager.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { sessionId, message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    const context = getContext(sessionId);
    context.push({ role: "user", content: message });

    const reply = await sendToGemini(context);

    context.push({ role: "assistant", content: reply });
    updateContext(sessionId, context);

    res.json({ reply });

  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "AI processing failed" });
  }
});

export default router;
