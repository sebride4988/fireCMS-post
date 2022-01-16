export interface Post {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  source?: string;
  createdAt: string;
  updatedAt: string | null;
}
