import styles from "./index.module.sass";
import { useEffect, useState } from "react";
import {
  createNotificationSubscription,
  receiveNotification,
  requestNotificationPermission,
} from "./utils";

const PushNotification = () => {
  const [show, setShow] = useState<boolean>(false);
  const [subscriptionId, setSubscriptionId] = useState<string>("");

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setShow(true);
    }
  }, []);

  function onSubscribe() {
    return requestNotificationPermission().then((result) => {
      if (result === "granted") {
        createNotificationSubscription().then((res) => {
          setSubscriptionId(res.id);
        });
      } else {
        throw new Error("We weren't granted permission.");
      }
    });
  }

  function onReceive() {
    receiveNotification(subscriptionId);
  }

  return (
    <div
      className={styles["notification"]}
      style={{
        display: show ? "block" : "none",
      }}
    >
      <button style={{ marginRight: 10 }} onClick={onSubscribe}>
        Subscribe!
      </button>
      <button onClick={onReceive}>Receive Notification</button>
    </div>
  );
};

export default PushNotification;
