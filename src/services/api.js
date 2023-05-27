export const fetchCats = () =>
  fetch("https://api.thecatapi.com/v1/images/search?limit=1").then((response) =>
    response.json()
  );
