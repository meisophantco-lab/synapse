import { useState } from "react";

export default function InputBox({ onSend }) {
  const [text, setText] = useState("");

  function handleSend() {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  }

  return (
    <div style={styles.box}>
      <input
        style={styles.input}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type your message..."
      />
      <button style={styles.btn} onClick={handleSend}>
        Send
      </button>
    </div>
  );
}

const styles = {
  box: {
    display: "flex",
    borderTop: "1px solid #ddd"
  },
  input: {
    flex: 1,
    padding: "12px",
    border: "none",
    outline: "none"
  },
  btn: {
    padding: "12px 18px",
    border: "none",
    background: "#007bff",
    color: "#fff",
    fontWeight: "bold"
  }
};
