import express from "express";
import { sendToGemini } from "../services/geminiService.js";
import { getContext, updateContext } from "../utils/contextManager.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { sessionId, message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const context = getContext(sessionId);

    context.push({ role: "user", content: message });

    const reply = await sendToGemini(context);

    context.push({ role: "assistant", content: reply });
    updateContext(sessionId, context);

    res.json({ reply });

  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "AI failed to respond" });
  }
});

export default router;
