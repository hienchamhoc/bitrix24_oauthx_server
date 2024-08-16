import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { format } from "date-fns";
function writeToken(userId: string, accessToken: string, refreshToken: string) {
  const fileName = path.join(__dirname, "../../data/token/", `${userId}.txt`);
  const content =
    "access_token:" + accessToken + "\n" + "refresh_token:" + refreshToken;
  try {
    fs.appendFile(fileName, content, (err) => {
      if (err) {
        console.error(err);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

export { writeToken };
