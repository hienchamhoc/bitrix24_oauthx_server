import axios from "axios";

var oauth2Axios = axios.create({
  baseURL: process.env.BITRIX24_DOMAIN,
  withCredentials: true,
  headers: {
    "content-type": "application/json",
  },
});
function initAxios() {
  oauth2Axios = axios.create({
    baseURL: process.env.BITRIX24_DOMAIN,
    withCredentials: true,
    headers: {
      "content-type": "application/json",
    },
  });
}

export { oauth2Axios, initAxios };
