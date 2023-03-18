export function wiseyApi(url) {
  return fetch(`${process.env.REACT_APP_WISEY_HOST}/${process.env.REACT_APP_WISEY_VERSION}${url}`, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_WISEY_TOKEN}`,
      Accept: "*/*",
      Host: "api.wisey.app",
      Connection: "keep-alive",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      // TODO: logging services
      throw error;
    });
}
