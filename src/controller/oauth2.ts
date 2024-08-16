import { log } from "console";
import { Request, Response } from "express";
import { oauth2Axios } from "../api/axios";
import fs, { access } from "fs";
import path from "path";
import { writeToken } from "../helper/writeFile";

async function getToken(req: Request, res: Response) {
  try {
    const { redirect_uri, code, scope } = req.query;
    const response = await oauth2Axios.get(
      "oauth/token/?client_id=" +
        process.env.APP_ID +
        "&grant_type=authorization_code&client_secret=" +
        process.env.APP_SECRET +
        (redirect_uri ? "&redirect_uri=" + redirect_uri : "") +
        (code ? "&code=" + code : "") +
        (scope ? "&scope=" + scope : "")
    );
    if (response.status == 200) {
      writeToken(
        response.data.user_id,
        response.data.access_token,
        response.data.refresh_token
      );
      res.status(200).json(response.data);
    }
  } catch (err: any) {
    if (err.response.status) {
      const statusCode = err.response.status;
      res.status(statusCode).json(err.response.data);
    } else {
      res.status(404).json({
        message: "Get token failed!",
        error: <Error>err.message,
      });
    }
  }
}

export { getToken };
