import { Address } from "../../type/address";
import { Requisite } from "../../type/requisite";
import { oauth2Axios } from "../axios";

const addressApi = {
  getList: async (token: string, requisiteId: number) => {
    const response = oauth2Axios.post(
      "rest/crm.address.list.json?auth=" + token,
      {
        filter: {
          ENTITY_ID: requisiteId,
          ENTITY_TYPE_ID: 8,
        },
        select: [
          "TYPE_ID",
          "ENTITY_TYPE_ID",
          "ENTITY_ID",
          "ADDRESS_1",
          "ADDRESS_2",
          "ANCHOR_TYPE_ID",
          "ANCHOR_ID",
        ],
      }
    );
    return response;
  },
  get: async (id: number, token: string) => {
    const response = oauth2Axios.get(
      "rest/crm.address.get.json?auth=" + token + "&id=" + id
    );
    return response;
  },
  add: async (token: string, requisiteId: number, address: Address) => {
    const response = await oauth2Axios.post(
      "rest/crm.address.add.json?auth=" + token,
      {
        fields: {
          ...address,
          ENTITY_TYPE_ID: 8,
          ENTITY_ID: requisiteId,
        },
      }
    );

    return response.data.result;
  },
  update: async (token: string, address: Address) => {
    const response = oauth2Axios.post(
      "rest/crm.address.update.json?auth=" + token + "&id=" + address.TYPE_ID,
      {
        fields: address,
      }
    );
    return response;
  },
  delete: async (token: string, address: Address) => {
    const response = oauth2Axios.post(
      "rest/crm.address.delete.json?auth=" + token,
      {
        fields: address,
      }
    );
    return response;
  },
};

export default addressApi;
