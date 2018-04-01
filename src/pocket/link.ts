import Pocket from 'pocket-promise';

export const getPocketLinkActions = (accessToken: string) => {
  const pocketApi = Pocket({
    consumer_key: process.env.POCKET_CONSUMER_KEY,
    access_token: accessToken,
  });
  return {
    addLinksToPocket: (linkList: string[]): Promise<PocketSendResponse> =>
      pocketApi.send({
        actions: linkList.map((url) => [
          {
            action: 'add',
            url,
          },
        ]),
      }),
  };
};
