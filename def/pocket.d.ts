declare module 'node-getpocket' {
  export const GetPocket: any;
  export default GetPocket;
}

declare interface Result {
  item_id: string;
  normal_url: string;
  resolved_id: string;
  extended_item_id: string;
  resolved_url: string;
  domain_id: string;
  origin_domain_id: string;
  response_code: '200';
  mime_type: 'text/html';
  content_length: string;
  encoding: 'utf-8';
  date_resolved: string;
  date_published: string;
  title: string;
  excerpt: string;
  word_count: string;
  innerdomain_redirect: '0' | '1';
  login_required: '0' | '1';
  has_image: '1';
  has_video: '2';
  is_index: '0' | '1';
  is_article: '0' | '1';
  used_fallback: '0' | '1';
  lang: 'en' | 'fr';
  time_first_parsed: string;
  authors: any[];
  images: any[];
  videos: any[];
  resolved_normal_url: string;
  given_url: string;
}

declare interface PocketRetrieveResponse {
  list: Result[];
  status: number;
}

declare interface PocketAddResponse {
  item: Result;
  status: number;
}

declare interface PocketSendResponse {
  action_results: Result[];
  status: number;
}

declare interface PocketAddOptions {
  url: string;
  title?: string;
  tags?: string;
  tweet_id?: string;
}

declare interface PocketGetOptions {
  state?: 'unread' | 'archive' | 'all';
  favorite?: 0 | 1;
  tag?: string | '_untagged_';
  contentType?: 'article' | 'video' | 'image';
  sort?: 'newest' | 'oldest' | 'title' | 'site';
  detailType?: 'simple' | 'complete';
  search?: string;
  domain?: string;
  since?: number;
  count?: number;
  offset?: number;
}

declare interface AddAction {
  action: 'add';
  item_id: number; // The id of the item to perform the action on
  ref_id?: number; // A Twitter status id; this is used to show tweet attribution
  tags?: string; // A comma-delimited list of one or more tags
  time?: number; // The time the action occurred
  title?: string; // The title of the item.
  url?: string; // The url of the item (if no item_id)
}

declare interface OtherAction {
  action:
    | 'archive'
    | 'readd'
    | 'favorite'
    | 'unfavorite'
    | 'delete'
    | 'tags_clear';
  item_id: number; // The id of the item to perform the action on
  time?: number; // The time the action occurred
}

declare interface TagsAction {
  action: 'tags_add' | 'tags_remove' | 'tags_replace';
  tags: string; // comma delimited list of 1 or more tags
  item_id: number; // The id of the item to perform the action on
  time?: number; // The time the action occurred
}

declare interface TagRenameAction {
  action: 'tag_rename';
  old_tag: string;
  new_tag: string;
  time?: number; // The time the action occurred
}

declare type PocketAction =
  | AddAction
  | OtherAction
  | TagsAction
  | TagRenameAction;

declare interface PocketSendOptions {
  actions: PocketAction[];
}

declare module 'pocket-promise' {
  export default class Pocket {
    constructor(opts: { consumer_key: string; access_token: string });
    add(opts: PocketAddOptions): Promise<PocketAddResponse>;
    get(opts: PocketGetOptions): Promise<PocketRetrieveResponse>;
    send(opts: PocketSendOptions): Promise<PocketSendResponse>;
  }
}
