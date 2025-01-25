export interface Comment {
  id: string;
  textDisplay: string;
  authorDisplayName: string;
  authorProfileImageUrl: string;
  publishedAt: string;
}

export interface WebSocketMessage {
  type: 'SHOW_COMMENT' | 'HIDE_COMMENT';
  payload?: Comment;
}

export interface ConnectionStatus {
  connected: boolean;
  error: string | null;
}