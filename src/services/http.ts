const host = "http://localhost:5000";

class Http {
  get(path: string) {
    return fetch(`${host}${path}`, {
      credentials: "omit",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "sec-fetch-mode": "cors",
      },
      mode: "cors",
    }).catch((error) => {
      console.log(error);
    });
  }

  post(path: string, body: any) {
    return fetch(`${host}${path}`, {
      credentials: "omit",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "sec-fetch-mode": "cors",
      },
      body: JSON.stringify(body),
      mode: "cors",
    })
      .then((res) => res.json())
      .catch((error) => {
        console.log(error);
      });
  }

  subscribePushNotification(payload: PushSubscription) {
    return this.post("/subscription", payload);
  }

  fetchPushNotification(id: string) {
    return this.get(`/subscription/${id}`);
  }
}

export default new Http();
