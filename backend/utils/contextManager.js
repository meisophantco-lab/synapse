const sessions = new Map();

export function getContext(sessionId = "default") {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, [
      {
        role: "system",
        content:
          "You are Synapse, a highly intelligent, friendly AI assistant for Meisophant Digital Services."
      }
    ]);
  }
  return sessions.get(sessionId);
}

export function updateContext(sessionId = "default", context) {
  sessions.set(sessionId, context.slice(-12)); // keep last 12 messages
}
