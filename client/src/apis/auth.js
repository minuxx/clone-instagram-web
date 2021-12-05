import client from "./config";

export async function signUpApi(data) {
  const response = await client.post("/join", data);

  return response.data;
}
