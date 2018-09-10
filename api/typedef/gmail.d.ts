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
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  historyId: string;
  internalDate: string; // epoch time
  payload: MessagePayload;
}

declare interface MessageListItem {
  id: string;
  threadId: string;
}

declare interface GmailLabel {
  id: string;
  name: string;
  messageListVisibility: string;
  labelListVisibility: string;
  type: string;
  messagesTotal: number;
  messagesUnread: number;
  threadsTotal: number;
  threadsUnread: number;
  color: {
    textColor: string;
    backgroundColor: string;
  };
}
