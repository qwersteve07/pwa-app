import { useEffect, useRef, useState } from "react";
import styles from "./index.module.sass";

type Status = "activate" | "deactivate"

export default function WakeUpToggler() {
  const [show, setShow] = useState<boolean>(false);
  const [status, setStatus] = useState<Status>("activate");
  const wakeLock = useRef<WakeLockSentinel | null>(null);

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
