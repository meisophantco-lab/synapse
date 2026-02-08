import { useState } from "react";
import InputBox from "./InputBox.jsx";

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi 👋 I'm Synapse. How can I help you today?" }
  ]);

  async function sendMessage(text) {
    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);

    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: "default",
        message: text
      })
    });

    const data = await res.json();

    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.chat}>
        {messages.map((m, i) => (
          <div key={i} style={m.role === "user" ? styles.user : styles.bot}>
            {m.content}
          </div>
        ))}
      </div>
      <InputBox onSend={sendMessage} />
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "75vh",
    border: "1px solid #ddd",
    borderRadius: "10px",
    overflow: "hidden"
  },
  chat: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
    background: "#fafafa"
  },
  user: {
    background: "#007bff",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "16px",
    margin: "6px 0",
    maxWidth: "80%",
    alignSelf: "flex-end"
  },
  bot: {
    background: "#eaeaea",
    color: "#000",
    padding: "8px 12px",
    borderRadius: "16px",
    margin: "6px 0",
    maxWidth: "80%",
    alignSelf: "flex-start"
  }
};
