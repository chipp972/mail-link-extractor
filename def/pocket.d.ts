declare module 'node-getpocket'{
  export const GetPocket: any
  export default GetPocket;
}

declare module 'pocket-promise';

declare interface PocketSendResponse {
  action_results: boolean[],
  status: number
}
