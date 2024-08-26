import { Bankdetail } from "../../type/bankdetail";
import { oauth2Axios } from "../axios";

const bankdetailApi = {
  getList: async (token: string, requisiteId: number) => {
    const response = oauth2Axios.post(
      "rest/crm.requisite.bankdetail.list.json?auth=" + token,
      {
        filter: {
          ENTITY_ID: requisiteId,
        },
        select: [
          "ID",
          "NAME",
          "ENTITY_ID",
          "RQ_BANK_NAME",
          "RQ_BANK_ADDR",
          "RQ_ACC_NUM",
        ],
      }
    );
    return response;
  },
  get: async (id: number, token: string) => {
    const response = oauth2Axios.get(
      "rest/crm.requisite.bankdetail.get.json?auth=" + token + "&id=" + id
    );
    return response;
  },
  add: async (token: string, requisiteId: number, bankdetail: Bankdetail) => {
    const response = await oauth2Axios.post(
      "rest/crm.requisite.bankdetail.add.json?auth=" + token,
      {
        fields: { ...bankdetail, ENTITY_TYPE_ID: 8, ENTITY_ID: requisiteId },
      }
    );

    return response.data.result;
  },
  update: async (
    token: string,
    requisiteId: number,
    bankdetail: Bankdetail
  ) => {
    const response = oauth2Axios.post(
      "rest/crm.requisite.bankdetail.update.json?auth=" +
        token +
        "&id=" +
        bankdetail.ID,
      {
        fields: { ...bankdetail, ENTITY_TYPE_ID: 8, ENTITY_ID: requisiteId },
      }
    );
    return response;
  },
  delete: async (token: string, id: number) => {
    const response = oauth2Axios.post(
      "rest/crm.requisite.bankdetail.delete.json?auth=" + token + "&id=" + id
    );
    return response;
  },
};
export default bankdetailApi;
