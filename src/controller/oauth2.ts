import { Request, Response } from "express";
import { oauth2Axios } from "../api/axios";
import fs, { access } from "fs";
import path from "path";
import { writeToken } from "../helper/writeFile";
import authApi from "../api/auth";

async function getToken(req: Request, res: Response) {
  try {
    const { redirect_uri, code, scope } = req.query;
    const response = await authApi.getToken(
      redirect_uri as string,
      code as string,
      scope as string
    );
    if (response.status == 200) {
      writeToken(response.data.user_id, JSON.stringify(response.data));
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
async function renewToken(req: Request, res: Response) {
  try {
    const { userId } = req.query;
    if (!userId) {
      throw new Error("User id not defined");
    }
    const fileName = path.join(__dirname, "../../data/token/", `${userId}.txt`);
    fs.readFile(fileName, "utf8", async (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          throw new Error("File not found:" + err.path);
        } else {
          throw new Error("Error reading file:" + err);
        }
      }
      const { refresh_token } = JSON.parse(data);
      const response = await authApi.renewToken(refresh_token);
      if (response.data.access_token) {
        fs.writeFile(fileName, JSON.stringify(response.data), (err) => {
          if (err) {
            throw new Error("Error while writing file");
          }
        });
        res.status(200).json(response.data);
      } else {
        throw new Error("Error while renew token");
      }
    });
  } catch (err: any) {
    if (err.response) {
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

export { getToken, renewToken };
