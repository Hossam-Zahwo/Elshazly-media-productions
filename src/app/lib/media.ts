export interface MediaItem {
  id: number;
  title: string;
  type: 'image' | 'video';
  url: string;
  section: string;
}
