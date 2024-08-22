import { Request, Response } from "express";
import addressApi from "../api/address";
import bankdetailApi from "../api/bankdetail";
async function delelteBankdetail(req: Request, res: Response) {
  try {
    const { id } = req.query;
    console.log("delete bank");

    if (!id) {
      throw new Error("ID is not defined");
    }
    const access_token = res.locals.access_token;

    const bankdetailRes = await bankdetailApi.delete(access_token, +id);
    res.json({ contact: bankdetailRes.data.result });
  } catch (err: any) {
    if (err.response) {
      const statusCode = err.response.status;
      res.status(statusCode).json(err.response.data);
    } else {
      res.status(404).json({
        message: "Delete bank detail failed!",
        error: <Error>err.message,
      });
    }
  }
}
export { delelteBankdetail };
