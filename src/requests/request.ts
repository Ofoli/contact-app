import axios, { AxiosResponse } from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

interface Payload {
  name: string;
  email: string;
  phone: string;
}

interface ValidResponse extends Payload {
  id: number;
}

type Response = ValidResponse | undefined;

async function addContactRequest(payload: Payload): Promise<Response> {
  console.log(payload);
  try {
    const { data } = await axios.post(BASE_URL, payload);
    return data;
  } catch (err) {
    console.log(err);
  }
}
async function fetchAllContactsRequest(): Promise<ContactProp[] | undefined> {
  try {
    const { data: contacts } = await axios.get(BASE_URL);
    return contacts;
  } catch (err) {
    console.log(err);
  }
}
async function fetchContactRequest(id: string): Promise<Response> {
  try {
    const { data: contact } = await axios.get(`${BASE_URL}/${id}}`);
    return contact;
  } catch (err) {
    console.log("ERROR", err);
  }
}
async function updateContactRequest(
  id: string,
  payload: Payload
): Promise<Response> {
  try {
    const { data } = await axios.put(`${BASE_URL}/${id}`, payload);
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function deleteContactRequest(id: string): Promise<void> {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (err) {
    console.log(err);
  }
}

export {
  addContactRequest,
  fetchContactRequest,
  fetchAllContactsRequest,
  updateContactRequest,
  deleteContactRequest,
};
