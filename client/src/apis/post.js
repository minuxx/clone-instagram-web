import client from "./config";

export async function postApi(data) {
  const response = await client.post("/posts", data);

  return response.data;
}
