import Pocket from 'pocket-promise';

const pocketApi = new Pocket({
  consumer_key: process.env.POCKET_CONSUMER_KEY,
  access_token: process.env.POCKET_ACCESS_TOKEN,
});

export async function saveLinksToPocket(
  linkList: string[],
): Promise<PocketSendResponse> {
  return await pocketApi.send({
    actions: linkList.map((url) => ({
      item_id: 0,
      action: 'add',
      url,
    })),
  });
}
