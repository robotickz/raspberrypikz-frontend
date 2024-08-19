import PocketBase from "pocketbase";

export default async function initPocketBase() {
  const pb = new PocketBase(process.env.PB_HOSTNAME);
  await pb.admins.authWithPassword(
    process.env.PB_USERNAME ?? "",
    process.env.PB_PASSWORD ?? "",
  );

  return pb;
}
