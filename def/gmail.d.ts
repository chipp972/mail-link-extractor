declare interface MessageHeader {
  name: string;
  value: string;
}

declare interface MessagePart {
  partId: string;
  mimeType: string;
  filename: string;
  headers: MessageHeader;
  body: {
    size: number;
    data?: string;
  };
}

declare interface MessagePayload {
  headers: MessageHeader[];
  body: {
    size: number;
    data?: string;
  };
  parts: MessagePart[];
  sizeEstimate: number;
}

declare interface MessageData {
  status: number;
  data: {
    id: string;
    threadId: string;
    labelIds: string[];
    snippet: string;
    historyId: string;
    internalDate: string; // epoch time
    payload: MessagePayload;
  };
}

declare interface MessageListItem {
  id: string;
  threadId: string;
}

declare interface MessageListResponse {
  status: number; // http status
  data: {
    messages: MessageListItem[];
    nextPageToken?: string; // if there is another page
    resultSizeEstimate: number;
  };
}

declare interface MessageListParams {
  gmail: any;
  q?: string;
  maxResults?: number;
  pageToken?: string;
}
