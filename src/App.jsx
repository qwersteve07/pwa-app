import { useEffect, useLayoutEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { fetchCats } from "./services/api";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <WakeUpToggle />
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
      <BatteryStatus />
    </>
  );
}

function BatteryStatus() {
  const [show, setShow] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [batteryCharging, setBatteryCharing] = useState(false);

  const startBatteryWatch = async () => {
    const battery = await navigator.getBattery();
    updateBatteryInfo();

    function updateBatteryInfo() {
      updateBatteryLevelInfo();
      updateBatteryCharingInfo();
    }

    function updateBatteryLevelInfo() {
      setBatteryLevel(battery.level);
    }

    function updateBatteryCharingInfo() {
      setBatteryCharing(battery.charging);
    }

    battery.addEventListener("levelchange", () => {
      updateBatteryLevelInfo();
    });

    battery.addEventListener("chargingchange", () => {
      updateBatteryCharingInfo();
    });
  };

  useLayoutEffect(() => {
    if ("getBattery" in navigator) {
      setShow(true);
      startBatteryWatch();
    }
  }, []);

  return (
    <div
      className="battery-status"
      style={{
        display: show ? "flex" : "none",
        backgroundColor: batteryCharging ? "#24bd24" : "transparent",
        position: "fixed",
        right: "30px",
        top: "30px",
        padding: "2px 6px",
        fontSize: "12px",
        borderRadius: "6px",
        border: "1px solid white",
      }}
    >
      {batteryLevel * 100} %
    </div>
  );
}

function WakeUpToggle() {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("activate"); // [active, inactive, undefined
  const wakeLock = useRef(null);

  const toggleWakeLock = async () => {
    if (wakeLock.current === null) {
      //  wakeLock is not active
      try {
        wakeLock.current = await navigator.wakeLock.request("screen");
        setStatus("deactivate");
      } catch (e) {
        console.log(e);
      }
    } else {
      //  wakeLock is active
      try {
        await wakeLock.current.release();
        wakeLock.current = null;
        setStatus("activate");
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if ("wakeLock" in navigator) {
      setShow(true);
    }
  }, []);

  return (
    <button
      style={{
        display: show ? "block" : "none",
        position: "fixed",
        left: "30px",
        top: "90px",
      }}
      onClick={toggleWakeLock}
    >
      {status} WakeLock
    </button>
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
