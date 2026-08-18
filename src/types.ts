export interface Wish {
  id: string;
  sender: string;
  relationship?: string;
  message: string;
  emoji?: string;
  color?: string;
  likes: number;
}

export interface Memory {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
  caption: string;
  location?: string;
  tag?: string;
  likes: number;
}

export interface LetterData {
  recipient: string;
  salutation: string;
  date: string;
  paragraphs: string[];
  signOff: string;
  sender: string;
}

export interface SiteConfig {
  recipientName: string;
  headlineMessage: string;
  subMessage: string;
}
