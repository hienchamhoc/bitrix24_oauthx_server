import { Request, Response } from "express";
import contactApi from "../api/contact";
import { Contact } from "../type/contact";
import requisiteApi from "../api/requisite";
import { Requisite } from "../type/requisite";
import addressApi from "../api/address";
import { Address } from "../type/address";
import bankdetailApi from "../api/bankdetail";
import { AxiosError } from "axios";

async function getListContact(req: Request, res: Response) {
  try {
    const access_token = res.locals.access_token;
    const listContactRes = await contactApi.getList(access_token);

    res.json({ contacts: listContactRes.data.result as Contact[] });
  } catch (err: any) {
    if (err.response) {
      const statusCode = err.response.status;
      res.status(statusCode).json(err.response.data);
    } else {
      res.status(404).json({
        message: "Get list contact failed!",
        error: <Error>err.message,
      });
    }
  }
}
async function getContact(req: Request, res: Response) {
  try {
    const { id } = req.query;
    if (!id) {
      throw new Error("ID is not defined");
    }
    const access_token = res.locals.access_token;

    const contactRes = await contactApi.get(+id, access_token);
    let contact: Contact = contactRes.data.result;
    const requisiteRes = await requisiteApi.getList(access_token, contact.ID);
    let requisites: Requisite[] = requisiteRes.data.result;

    for (var rqIndex = 0; rqIndex < requisites.length; rqIndex++) {
      const addressRes = await addressApi.getList(
        access_token,
        requisites[rqIndex].ID
      );
      const address: Address[] = addressRes.data.result;
      requisites[rqIndex].ADDRESSES = address;
      const BankdetailRes = await bankdetailApi.getList(
        access_token,
        requisites[rqIndex].ID
      );

      const bankdetail = BankdetailRes.data.result;
      requisites[rqIndex].BANKDETAILS = bankdetail;
    }
    contact.REQUISITES = requisites;
    res.json({ contact: contact });
  } catch (err: any) {
    if (err.response) {
      const statusCode = err.response.status;
      res.status(statusCode).json(err.response.data);
    } else {
      res.status(404).json({
        message: "Get contact failed!",
        error: <Error>err.message,
      });
    }
  }
}
async function addContact(req: Request, res: Response) {
  try {
    const contactReq: Contact = req.body;

    if (!contactReq.NAME) {
      throw new Error("Name is not defined");
    }
    const access_token = res.locals.access_token;
    // add contact
    const contactId = await contactApi.add(access_token, contactReq);

    if (contactReq.REQUISITES) {
      // loop each requisite
      for (let rqIndex = 0; rqIndex < contactReq.REQUISITES.length; rqIndex++) {
        //add requisite
        const requisiteId = await requisiteApi.add(
          access_token,
          +contactId,
          contactReq.REQUISITES[rqIndex]
        );
        if (contactReq.REQUISITES[rqIndex].ADDRESSES) {
          // loop each address
          for (
            let addrIndex = 0;
            addrIndex < contactReq.REQUISITES[rqIndex].ADDRESSES!.length;
            addrIndex++
          ) {
            //add address
            const addressId = await addressApi.add(
              access_token,
              +requisiteId,
              contactReq.REQUISITES[rqIndex].ADDRESSES![addrIndex]
            );
          }
        }
        if (contactReq.REQUISITES[rqIndex].BANKDETAILS) {
          // loop each bank detail
          for (
            let bankIndex = 0;
            bankIndex < contactReq.REQUISITES[rqIndex].BANKDETAILS!.length;
            bankIndex++
          ) {
            //add bank detail
            const bankdetailId = await bankdetailApi.add(
              access_token,
              +requisiteId,
              contactReq.REQUISITES[rqIndex].BANKDETAILS![bankIndex]
            );
          }
        }
      }
    }

    res.json({ id: contactId });
  } catch (err: any) {
    if (err.response) {
      const statusCode = err.response.status;
      res.status(statusCode).json(err.response.data);
    } else {
      res.status(404).json({
        message: "Add token failed!",
        error: <Error>err.message,
      });
    }
  }
}
async function updateContact(req: Request, res: Response) {
  try {
    const { id } = req.query;
    const contactReq: Contact = req.body;
    if (!id) {
      throw new Error("ID is not defined");
    }
    const access_token = res.locals.access_token;

    const contactRes = await contactApi.update(access_token, +id, contactReq);
    if (contactReq.REQUISITES) {
      // loop each requisite
      for (let rqIndex = 0; rqIndex < contactReq.REQUISITES.length; rqIndex++) {
        if (contactReq.REQUISITES[rqIndex].ID) {
          //update requisite
          const requisiteId = await requisiteApi.update(
            access_token,
            +contactReq.REQUISITES[rqIndex].ID,
            contactReq.REQUISITES[rqIndex]
          );
          //get list address exist
          const addressRes = await addressApi.getList(
            access_token,
            contactReq.REQUISITES[rqIndex].ID
          );
          const addressesExist: Address[] = addressRes.data.result;
          contactReq.REQUISITES[rqIndex].ADDRESSES?.map(async (address) => {
            const found = addressesExist.find(
              (element) => element.TYPE_ID == address.TYPE_ID
            );
            if (found) {
              //if address already exists, update it
              if (address.ADDRESS_1 || address.ADDRESS_2 || address.TYPE_ID) {
                const update = await addressApi.update(
                  access_token,
                  contactReq.REQUISITES![rqIndex].ID,
                  address
                );
              }
            } else {
              //if address does not existe, add it
              if (address.ADDRESS_1 || address.ADDRESS_2 || address.TYPE_ID) {
                const add = await addressApi.add(
                  access_token,
                  contactReq.REQUISITES![rqIndex].ID,
                  address
                );
              }
            }
          });
          contactReq.REQUISITES![rqIndex].BANKDETAILS?.map((bankdetail) => {
            if (bankdetail.ID) {
              //if address already exists, update it
              if (
                bankdetail.RQ_ACC_NUM ||
                bankdetail.RQ_BANK_ADDR ||
                bankdetail.RQ_BANK_NAME
              ) {
                const update = bankdetailApi.update(
                  access_token,
                  contactReq.REQUISITES![rqIndex].ID,
                  bankdetail
                );
              }
            } else {
              //if address does not exists, add it
              if (
                bankdetail.RQ_ACC_NUM ||
                bankdetail.RQ_BANK_ADDR ||
                bankdetail.RQ_BANK_NAME
              ) {
                const add = bankdetailApi.add(
                  access_token,
                  contactReq.REQUISITES![rqIndex].ID,
                  bankdetail
                );
              }
            }
          });
        } else {
          //add requisite

          const requisiteId = await requisiteApi.add(
            access_token,
            +id,
            contactReq.REQUISITES[rqIndex]
          );
          // loop each address
          for (
            let addrIndex = 0;
            addrIndex < contactReq.REQUISITES[rqIndex].ADDRESSES!.length;
            addrIndex++
          ) {
            //add address
            const addressId = await addressApi.add(
              access_token,
              +requisiteId,
              contactReq.REQUISITES[rqIndex].ADDRESSES![addrIndex]
            );
          }
          // loop each bankdetail
          for (
            let bankIndex = 0;
            bankIndex < contactReq.REQUISITES[rqIndex].BANKDETAILS!.length;
            bankIndex++
          ) {
            //add bankdetail
            const bankdetailId = await bankdetailApi.add(
              access_token,
              +requisiteId,
              contactReq.REQUISITES[rqIndex].BANKDETAILS![bankIndex]
            );
          }
        }
      }
    }
    res.json({ contact: contactRes.data.result });
  } catch (err: any) {
    if (err.response) {
      const statusCode = err.response.status;
      res.status(statusCode).json(err.response.data);
    } else {
      res.status(404).json({
        message: "Update contact failed!",
        error: <Error>err.message,
      });
    }
  }
}
async function deleteContact(req: Request, res: Response) {
  try {
    const { id } = req.query;
    if (!id) {
      throw new Error("ID is not defined");
    }
    const access_token = res.locals.access_token;

    const contactRes = await contactApi.delete(access_token, +id);
    res.json({ contact: contactRes.data.result });
  } catch (err: any) {
    if (err.response) {
      const statusCode = err.response.status;
      res.status(statusCode).json(err.response.data);
    } else {
      res.status(404).json({
        message: "Delete contact failed!",
        error: <Error>err.message,
      });
    }
  }
}

export { getListContact, getContact, addContact, updateContact, deleteContact };
