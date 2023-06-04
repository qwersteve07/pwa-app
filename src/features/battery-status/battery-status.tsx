import { useLayoutEffect, useState } from "react";
import styles from "./index.module.sass";

export default function BatteryStatus() {
  const [show, setShow] = useState<boolean>(false);
  const [batteryLevel, setBatteryLevel] = useState<number>(0);
  const [batteryCharging, setBatteryCharing] = useState<boolean>(false);

  const startBatteryWatch = async () => {
    const navigatorWithBattery = navigator as NavigatorWithBattery
    const battery = await navigatorWithBattery.getBattery();
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
      {(batteryLevel * 100).toFixed(0)} %
    </div>
  );
}
