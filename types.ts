import { LucideIcon } from 'lucide-react';

export enum SlideType {
  TITLE = 'TITLE',
  WARNING = 'WARNING',
  INFO = 'INFO',
  LIST = 'LIST',
  IFRAME = 'IFRAME', // Nowy typ dla strony WWW
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
  images?: { 
    url: string; 
    caption?: string;
    arrow?: { x: number; y: number; direction?: 'up' | 'down' | 'left' | 'right' };
    className?: string;
  }[]; // Tablica zdjęć
}