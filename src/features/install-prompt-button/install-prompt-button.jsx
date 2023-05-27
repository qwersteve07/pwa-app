import { useEffect, useRef, useState } from "react";
import styles from "./index.module.sass";

export default function InstallPromptButton() {
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
      className={styles["install-prompt-button"]}
      style={{
        display: show ? "block" : "none",
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
