const host = "http://localhost:5000";

class Http {
  get(path) {
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

  post(path, body) {
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

  subscribePushNotification(payload) {
    return this.post("/subscription", payload);
  }

  fetchPushNotification(id) {
    return this.get(`/subscription/${id}`);
  }
}

export default new Http();
