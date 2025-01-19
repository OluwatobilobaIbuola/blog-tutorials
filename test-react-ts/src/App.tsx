import CommentsContainer from "./components/comments-container";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <CommentsContainer />
    </div>
  );
}

export default App;
