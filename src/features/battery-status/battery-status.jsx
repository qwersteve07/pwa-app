import { useLayoutEffect, useState } from "react";
import styles from "./index.module.sass";

export default function BatteryStatus() {
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
      className={styles["battery-status"]}
      style={{
        display: show ? "flex" : "none",
        backgroundColor: batteryCharging ? "#24bd24" : "transparent",
      }}
    >
      {batteryLevel * 100} %
    </div>
  );
}
