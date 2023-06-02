import http from "../../services/http";

export const requestNotificationPermission = () => {
  return Notification.requestPermission().catch((error) => {
    console.log(error);
  });
};

export const createNotificationSubscription = async () => {
  // same key as pwa server used
  const PUSH_NOTIFICATION_PUBLIC_VAPID_KEY =
    "BPMVhCKZ0_RecFl4oDyIqXzkkzaWB9aOgHJJTkgy2BFRG1nmieXifCv6EsB2WjLW-T6Ks6qt456rhRYx1mc9hhc";

  const options = {
    userVisibleOnly: true,
    applicationServerKey: PUSH_NOTIFICATION_PUBLIC_VAPID_KEY,
  };

  // need to subscribe from service worker pushManager
  // then send subscription to server with the returned payload
  // ref: https://miro.medium.com/v2/resize:fit:1400/format:webp/1*hP_7w2Ig9Iwk_Vef0DafcA.png
  return navigator.serviceWorker.ready
    .then((registration) => {
      return registration.pushManager.subscribe(options);
    })
    .then((subscription) => {
      console.log("user is subscribed", subscription);
      return http.subscribePushNotification(subscription);
    });
};

export const receiveNotification = (subscriptionId) => {
  http.fetchPushNotification(subscriptionId);
};
