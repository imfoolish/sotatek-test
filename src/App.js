import logo from "./logo.svg";
import "./App.css";
import SimpleDatePicker from "./components/common/SimpleDatePicker";

function App() {
  return (
    <div className="App" style={{ display: "flex", justifyContent: "center" }}>
      <div className="main" style={{ width: "1209px" }}>
        <div style={{ display: "flex" }}>
          <div
            className="new-task"
            style={{
              width: "45%",
              padding: "1rem 2rem",
              border: "1px solid black",
              boxSizing: "border-box",
              height: "100vh",
            }}
          >
            <div
              className="Text"
              style={{ textAlign: "center", marginBottom: "48px" }}
            >
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                New task
              </span>
            </div>
            <div className="form">
              <div>
                <input
                  type="text"
                  placeholder="Add new task..."
                  style={{
                    boxSizing: "border-box",
                    width: "100%",
                    fontFamily: "Source Sans Pro",
                    color: "#000000",
                    fontSize: "12px",
                    fontWeight: "700",
                    fontStyle: "normal",
                    textAlign: "left",
                    padding: "10px",
                    background: "#FFFFFF",
                    border: "1px solid #BDBDBD",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div style={{ marginTop: "16px" }}>
                <p style={{ fontSize: "12px", fontWeight: "bold" }}>
                  Description
                </p>
                <textarea
                  rows={5}
                  style={{
                    boxSizing: "border-box",
                    width: "100%",
                    fontFamily: "Source Sans Pro",
                    color: "#000000",
                    fontSize: "12px",
                    fontWeight: "700",
                    fontStyle: "normal",
                    textAlign: "left",
                    padding: "10px",
                    background: "#FFFFFF",
                    border: "1px solid #BDBDBD",
                    borderRadius: "5px",
                  }}
                ></textarea>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="due-date">
                  <SimpleDatePicker />
                </div>
                <div className="priority"></div>
              </div>
            </div>
          </div>
          <div className="list"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
