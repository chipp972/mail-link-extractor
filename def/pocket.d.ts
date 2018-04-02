declare module 'node-getpocket' {
  export const GetPocket: any;
  export default GetPocket;
}

declare module 'pocket-promise';

declare interface ActionResult {
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

declare interface PocketSendResponse {
  action_results: ActionResult[];
  status: number;
}
