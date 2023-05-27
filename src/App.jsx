import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { fetchCats } from "./services/api";

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
    </>
  );
}

function InstallPromptButton() {
  const [show, setShow] = useState(false);
  const deferredPrompt = useRef();

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt.current = e;
      setShow(true);
    });
  }, []);

  return (
    <button
      style={{
        display: show ? "block" : "none",
        position: "fixed",
        left: "30px",
        top: "30px",
      }}
      onClick={() => {
        deferredPrompt.current.prompt();
        deferredPrompt.current.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the A2HS prompt");
          } else {
            console.log("User dismissed the A2HS prompt");
          }
          deferredPrompt.current = null;
          setShow(false);
        });
      }}
    >
      Install PWA App
    </button>
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
