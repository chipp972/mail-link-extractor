import { GoogleAccount } from './google_account';

export interface MessageHeader {
  name: string;
  value: string;
}

export interface MessagePart {
  partId: string;
  mimeType: string;
  filename: string;
  headers: MessageHeader;
  body: {
    size: number;
    data?: string;
  };
}

export interface MessagePayload {
  headers: MessageHeader[];
  body: {
    size: number;
    data?: string;
  };
  parts: MessagePart[];
  sizeEstimate: number;
}

export interface MessageData {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  historyId: string;
  internalDate: string; // epoch time
  payload: MessagePayload;
}

export interface MessageListItem {
  id: string;
  threadId: string;
}

export interface GmailLabel {
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

export interface GmailManager {
  getMessagesLinks: (
    googleAccount: GoogleAccount,
    query?: string,
    maxResults?: number
  ) => Promise<string[]>;
  addLabelsToMessages: (
    googleAccount: GoogleAccount,
    messageIds: string[],
    labels: string[]
  ) => Promise<any>;
}
