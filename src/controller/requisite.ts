import { Request, Response } from "express";
import requisiteApi from "../api/requisite";
async function deleteRequisite(req: Request, res: Response) {
  try {
    const { id } = req.query;
    if (!id) {
      throw new Error("ID is not defined");
    }
    const access_token = res.locals.access_token;

    const requisiteRes = await requisiteApi.delete(access_token, +id);
    res.json({ contact: requisiteRes.data.result });
  } catch (err: any) {
    if (err.response) {
      const statusCode = err.response.status;
      res.status(statusCode).json(err.response.data);
    } else {
      res.status(404).json({
        message: "Delete requisite failed!",
        error: <Error>err.message,
      });
    }
  }
}
export { deleteRequisite };
