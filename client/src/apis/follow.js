import client from "./config";

export async function getFollowsApi() {
  const response = await client.get(`/follows`);

  return response.data;
}
