export interface MediaItem {
  id: number;
  title: string;
  type: 'video' | 'image';
  url: string;
  section: string;
}
