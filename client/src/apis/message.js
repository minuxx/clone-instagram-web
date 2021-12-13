import client from "./config";

export async function getMessagesApi(id) {
  const response = await client.get(`/messages/${id}`);

  return response.data;
}

export async function sendMessageApi(data) {
  const response = await client.post("/messages", data);

  return response.data;
}
