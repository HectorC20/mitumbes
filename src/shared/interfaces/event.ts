export interface EventItem {
  id: string;
  title: string;
  date: string;
  category: string;
  badge?: string;
  location: string;
  description: string;
  image: string;
  href: string;
  verified?: boolean;
}

export interface RangoEvento {
  desde: Date;
  hasta: Date;
  recurrente: boolean;
}
