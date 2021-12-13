import client from "./config";

export async function getFollowsApi() {
  const response = await client.get("/follows");

  return response.data;
}

export async function followingApi(data) {
  const response = await client.post(`/follows`, data);

  return response.data;
}

export async function cancelfollowingApi(id) {
  const response = await client.delete(`/follows/${id}`);

  return response.data;
}

export async function getFollowersApi(name) {
  const response = await client.get(`/follows/${name}`);

  return response.data;
}
