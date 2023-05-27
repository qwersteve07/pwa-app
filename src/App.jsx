import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { fetchCats } from "./services/api";
import BatteryStatus from "./features/battery-status/battery-status";
import InstallPromptButton from "./features/install-prompt-button/install-prompt-button";
import WakeUpToggler from "./features/wake-lock-toggler/wake-lock-toggler";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Cat />
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <InstallPromptButton />
      <WakeUpToggler />
      <BatteryStatus />
    </>
  );
}

function Cat() {
  const [cat, setCat] = useState([]);

  useEffect(() => {
    fetchCats().then((data) => setCat(data));
  }, []);

  return (
    <img
      src={cat[0]?.url}
      width={100}
      style={{ display: "block", margin: "0 auto", borderRadius: "50%" }}
    />
  );
}

export default App;
