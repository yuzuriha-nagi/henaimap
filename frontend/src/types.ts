export interface FavoriteItem {
  id: string;
  title: string;
  category: 'Music' | 'Game' | 'Character';
  description: string;
  imageUrl: string;
}
