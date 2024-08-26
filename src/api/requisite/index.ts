import { Requisite } from "../../type/requisite";
import { oauth2Axios } from "../axios";

const requisiteApi = {
  getList: async (token: string, contactId: number) => {
    const response = oauth2Axios.post(
      "rest/crm.requisite.list.json?auth=" + token,
      {
        filter: {
          ENTITY_ID: contactId,
          ENTITY_TYPE_ID: 3,
        },
        select: [
          "ID",
          "NAME",
          "ENTITY_TYPE_ID",
          "ENTITY_ID",
          "RQ_FIRST_NAME",
          "RQ_LAST_NAME",
        ],
      }
    );
    return response;
  },
  get: async (id: number, token: string) => {
    const response = oauth2Axios.get(
      "rest/crm.requisite.list.json?auth=" + token + "&id=" + id
    );
    return response;
  },
  add: async (token: string, contactId: number, requisite: Requisite) => {
    const response = await oauth2Axios.post(
      "rest/crm.requisite.add.json?auth=" + token + "&id=" + requisite.ID,
      {
        fields: {
          ...requisite,
          ENTITY_TYPE_ID: 3,
          ENTITY_ID: contactId,
          PRESET_ID: 3,
          NAME: "Person",
        },
      }
    );
    return response.data.result;
  },
  update: async (token: string, id: number, requisite: Requisite) => {
    const response = oauth2Axios.post(
      "rest/crm.requisite.update.json?auth=" + token + "&id=" + id,
      {
        fields: requisite,
      }
    );
    return response;
  },
  delete: async (token: string, id: number) => {
    const response = oauth2Axios.post(
      "rest/crm.requisite.delete.json?auth=" + token + "&id=" + id
    );

    return response;
  },
};

export default requisiteApi;
