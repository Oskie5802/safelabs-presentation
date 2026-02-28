import { LucideIcon } from 'lucide-react';

export enum SlideType {
  TITLE = 'TITLE',
  WARNING = 'WARNING',
  INFO = 'INFO',
  LIST = 'LIST',
  LIVE_DEMO = 'LIVE_DEMO', // Nowy typ dla Live Demo
  IFRAME = 'IFRAME', // Nowy typ dla strony WWW
  SPLIT_IFRAME = 'SPLIT_IFRAME', // Nowy typ dla podzielonego widoku z iframe
  IMAGE = 'IMAGE',   // Nowy typ dla zdjęć
}

export interface SlideContent {
  id: string;
  type: SlideType;
  title?: string;
  subtitle?: string;
  mainText?: string;
  description?: string;
  bulletPoints?: string[];
  icon?: LucideIcon;
  accentColor?: string;
  contentUrl?: string; // URL dla iframe
  rightContentUrl?: string; // URL dla prawego iframe (SPLIT_IFRAME)
  refreshInterval?: number; // Czas odświeżania w ms (np. dla prawego iframe)
  images?: {
    url: string;
    caption?: string;
    arrow?: { x: number; y: number; direction?: 'up' | 'down' | 'left' | 'right' };
    className?: string;
    zoom?: boolean | number;
    zoomOrigin?: { x: number; y: number };
  }[]; // Tablica zdjęć
}