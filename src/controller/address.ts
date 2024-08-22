import { Request, Response } from "express";
import addressApi from "../api/address";
async function delelteAddress(req: Request, res: Response) {
  try {
    const address = req.body;

    const access_token = res.locals.access_token;

    const addressRes = await addressApi.delete(access_token, address);
    res.json({ contact: addressRes.data.result });
  } catch (err: any) {
    if (err.response) {
      const statusCode = err.response.status;
      res.status(statusCode).json(err.response.data);
    } else {
      res.status(404).json({
        message: "Delete address failed!",
        error: <Error>err.message,
      });
    }
  }
}
export { delelteAddress };
