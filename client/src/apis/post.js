import client from "./config";

export async function postApi(data) {
  const response = await client.post("/posts", data);

  return response.data;
}

export async function getPostsApi() {
  const response = await client.get("/posts");

  return response.data;
}
