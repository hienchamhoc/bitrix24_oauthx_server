import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { format } from "date-fns";
function writeToken(userId: string, content: string) {
  const fileName = path.join(__dirname, "../../data/token/", `${userId}.txt`);
  try {
    fs.writeFile(fileName, content, (err) => {
      if (err) {
        console.error(err);
      }
    });
  } catch (error) {
    console.error(error);
  }
}
function checkToken(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.query;
    if (!userId) {
      throw new Error("User id not defined");
    }

    const fileName = path.join(__dirname, "../../data/token/", `${userId}.txt`);
    fs.readFile(fileName, "utf8", (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          console.error("File not found:", err.path);
        } else {
          console.error("Error reading file:", err);
        }
        return;
      }
      const { access_token } = JSON.parse(data);
      res.locals.access_token = access_token;
      next();
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

export { writeToken, checkToken };
