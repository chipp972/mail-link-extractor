/**
 * save a list of links into a pocket account
 */
export async function saveLinksToPocket(
  pocketApi: any,
  linkList: string[]
): Promise<PocketSendResponse> {
  return await pocketApi.send({
    actions: linkList.map((url) => ({
      item_id: 0,
      action: 'add',
      url
    }))
  });
}
