import client from "./config";

export async function postApi(data) {
  const response = await client.post("/posts", data);

  return response.data;
}

export async function getPostsApi(filter, value) {
  const response = await client.get(`/posts?filter=${filter}&search=${value}`);

  return response.data;
}
