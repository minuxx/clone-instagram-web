import client from "./config";

export async function getMessagesApi(id) {
  const response = await client.get(`/messages/${id}`);

  return response.data;
}
