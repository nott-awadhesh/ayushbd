import { Wish, Memory, LetterData, SiteConfig } from '../types';

export const initialSiteConfig: SiteConfig = {
  recipientName: 'Ayush Gupta',
  headlineMessage: 'Happy Birthday, Ayush Gupta! ✨',
  subMessage: 'May this year bring you endless opportunities, unforgettable adventures, peaceful mornings, and big reasons to smile every single day.',
};

export const initialWishes: Wish[] = [
  {
    id: 'w1',
    sender: 'Your Inner Circle',
    relationship: 'Best Friends',
    message: 'Happy Birthday Ayush! Wishing you a year full of brilliant milestones, spontaneous adventures, and all the happiness in the world. Keep being the amazing soul you are!',
    emoji: '🥂',
    color: 'from-purple-100 to-purple-50',
    likes: 12,
  },
  {
    id: 'w2',
    sender: 'Family & Loved Ones',
    relationship: 'Family',
    message: 'To our pride and joy, may your special day be wrapped in warmth, love, and sweet moments. Keep shining bright and inspiring everyone around you!',
    emoji: '✨',
    color: 'from-pink-100 to-rose-50',
    likes: 18,
  },
  {
    id: 'w3',
    sender: 'Work & Tech Comrades',
    relationship: 'Team & Colleagues',
    message: 'Happy Birthday Ayush! May your code compile cleanly on the first run, your coffee stay warm, and your ideas reach phenomenal new heights this year!',
    emoji: '🚀',
    color: 'from-indigo-100 to-purple-50',
    likes: 9,
  },
  {
    id: 'w4',
    sender: 'Lifelong Buddies',
    relationship: 'Old Friends',
    message: 'Cheers to another year of laughs that make our stomachs hurt, late-night talks, and growing into the extraordinary person you are today. Have a blast!',
    emoji: '🎉',
    color: 'from-amber-100 to-purple-50',
    likes: 15,
  }
];

export const initialLetter: LetterData = {
  recipient: 'Ayush Gupta',
  salutation: 'Dearest Ayush,',
  date: 'August 18, 2026',
  paragraphs: [
    'Today is a celebration of you—the laughter you effortlessly bring into rooms, your unwavering kindness, and the genuine way you lift up everyone lucky enough to be in your orbit.',
    'Looking back at the past year, it has been wonderful witnessing your growth, your quiet determination, and how you tackle every challenge with both grace and good humor. You have a rare gift for making people feel valued and heard.',
    'As you step into this new year of your life, I hope you take time to pause and appreciate just how far you have come. May the coming chapters be rich with serendipitous discoveries, meaningful connections, effortless joy, and dreams turning into proud realities.',
    'Never forget how cherished and respected you are. Here is to another 365 days of being uniquely, wonderfully yourself.'
  ],
  signOff: 'With all my warmth & love,',
  sender: 'Forever cheering for you ❤️'
};

export const initialMemories: Memory[] = [
  {
    id: 'm1',
    title: 'The Golden Sunset Hike',
    imageUrl: 'update.png',
    date: 'Summer Getaway',
    caption: 'That unforgettable mountain view and the long conversations as dusk turned into a sky full of stars.',
    location: 'Alpine Ridge',
    tag: 'Adventures',
    likes: 24,
  },
  {
    id: 'm2',
    title: 'Coffee & Big Ideas',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80',
    date: 'Weekend Catchup',
    caption: 'Hours flew by discussing dreams, projects, and the next big chapter over endless cups of cappuccino.',
    location: 'The Corner Cafe',
    tag: 'Candid Moments',
    likes: 19,
  },
  {
    id: 'm3',
    title: 'Spontaneous Road Trip',
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80',
    date: 'Spring Holiday',
    caption: 'Windows rolled down, favorite playlist on repeat, and zero plans beyond following the open road.',
    location: 'Coastal Highway',
    tag: 'Adventures',
    likes: 31,
  },
  {
    id: 'm4',
    title: 'Milestone Celebration',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80',
    date: 'Celebration Night',
    caption: 'Toast to the wins, the learning curves, and the good times shared with the favorite crew.',
    location: 'Rooftop Lounge',
    tag: 'Celebrations',
    likes: 28,
  },
  {
    id: 'm5',
    title: 'Peaceful Morning Glow',
    imageUrl: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1000&q=80',
    date: 'Early Autumn',
    caption: 'Crisp air, quiet stillness, and that refreshing clarity before the world woke up.',
    location: 'Pine Lake',
    tag: 'Candid Moments',
    likes: 16,
  },
  {
    id: 'm6',
    title: 'Late Night Sparks',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
    date: 'Festive Season',
    caption: 'Surrounded by good vibes, sparklers, and laughter echoing well past midnight.',
    location: 'Backyard Gathering',
    tag: 'Celebrations',
    likes: 35,
  }
];
