import { useEffect, useRef, useState } from "react";
import styles from "./index.module.sass";

export default function WakeUpToggler() {
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
      className={styles["wake-lock-toggler"]}
      style={{
        display: show ? "block" : "none",
      }}
      onClick={toggleWakeLock}
    >
      {status} WakeLock
    </button>
  );
}
