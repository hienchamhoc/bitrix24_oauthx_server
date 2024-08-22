import { oauth2Axios } from "../axios";

const authApi = {
  getToken: async (
    redirect_uri: string | undefined,
    code: string | undefined,
    scope: string | undefined
  ) => {
    const response = await oauth2Axios.get(
      "oauth/token/?client_id=" +
        process.env.APP_ID +
        "&grant_type=authorization_code&client_secret=" +
        process.env.APP_SECRET +
        (redirect_uri ? "&redirect_uri=" + redirect_uri : "") +
        (code ? "&code=" + code : "") +
        (scope ? "&scope=" + scope : "")
    );

    return response;
  },
  renewToken: async (refresh_token: string) => {
    const response = await oauth2Axios.get(
      "oauth/token/?client_id=" +
        process.env.APP_ID +
        "&grant_type=refresh_token&client_secret=" +
        process.env.APP_SECRET +
        "&refresh_token=" +
        refresh_token
    );

    return response;
  },
};

export default authApi;
