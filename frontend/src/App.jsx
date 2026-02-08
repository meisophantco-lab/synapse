import ChatWindow from "./components/ChatWindow.jsx";

export default function App() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Synapse AI</h1>
      <ChatWindow />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "12px",
    fontFamily: "system-ui, sans-serif"
  },
  title: {
    textAlign: "center",
    marginBottom: "10px"
  }
};
