import { Contact } from "../../type/contact";
import { oauth2Axios } from "../axios";

const contactApi = {
  getList: async (token: string) => {
    const response = oauth2Axios.get(
      "rest/crm.contact.list.json?auth=" + token
    );
    return response;
  },
  get: async (id: number, token: string) => {
    const response = oauth2Axios.get(
      "rest/crm.contact.get.json?auth=" + token + "&id=" + id
      // {
      //   select: [
      //     "ID",
      //     "NAME",
      //     "POST",
      //     "BIRTHDAY",
      //     "PHONE",
      //     "EMAIL",
      //     "WEB",
      //     "DATE_CREATE",
      //     "DATE_MODIFY",
      //   ],
      // }
    );
    return response;
  },
  add: async (token: string, contact: Contact) => {
    const response = await oauth2Axios.post(
      "rest/crm.contact.add.json?auth=" + token + "&id=" + contact.ID,
      {
        fields: contact,
      }
    );

    return response.data.result;
  },
  update: async (token: string, id: number, contact: Contact) => {
    const response = oauth2Axios.post(
      "rest/crm.contact.update.json?auth=" + token + "&id=" + id,
      {
        fields: contact,
      }
    );

    return response;
  },
  delete: async (token: string, id: number) => {
    const response = oauth2Axios.post(
      "rest/crm.contact.delete.json?auth=" + token + "&id=" + id
    );
    return response;
  },
};

export default contactApi;
