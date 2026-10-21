export interface QuizOption {
  text: string;
  archetype: 'cinnamon' | 'goblin' | 'chaos' | 'legend' | 'survivor';
  letter: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  context: string;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Your phone battery drops to 1%. You:",
    context: "A high-stakes laboratory pressure experiment.",
    options: [
      { letter: 'A', text: "Panic immediately and watch life flash before your eyes.", archetype: 'cinnamon' },
      { letter: 'B', text: "Become an energy-saving monk (screen brightness: 0%).", archetype: 'legend' },
      { letter: 'C', text: "Search frantically for a charger like it's hidden pirate gold.", archetype: 'chaos' },
      { letter: 'D', text: "Accept your fate dramatically: 'If I perish, tell them I was iconic.'", archetype: 'survivor' }
    ]
  },
  {
    id: 2,
    question: "Someone texts you: 'We need to talk.' You:",
    context: "The four words capable of bending space-time.",
    options: [
      { letter: 'A', text: "My soul leaves my body and ascends to the upper stratosphere.", archetype: 'cinnamon' },
      { letter: 'B', text: "I instantly start compiling evidence and preparing my courtroom defense.", archetype: 'legend' },
      { letter: 'C', text: "I reply 'about what???' with 14 question marks in 0.4 seconds.", archetype: 'chaos' },
      { letter: 'D', text: "I turn into Sherlock Holmes and review every interaction since 2019.", archetype: 'survivor' }
    ]
  },
  {
    id: 3,
    question: "Your idea of the absolute perfect weekend:",
    context: "No obligations. Pure freedom. How do you honor the cosmos?",
    options: [
      { letter: 'A', text: "Sleeping for 14 hours wrapped like a majestic burrito.", archetype: 'goblin' },
      { letter: 'B', text: "Going on an impromptu adventure with zero itinerary.", archetype: 'chaos' },
      { letter: 'C', text: "Eating delicious snacks while watching favorite comfort shows.", archetype: 'cinnamon' },
      { letter: 'D', text: "Doing absolutely nothing and speaking to approximately 0 humans.", archetype: 'legend' }
    ]
  },
  {
    id: 4,
    question: "How do your closest friends describe you?",
    context: "Be brutally honest. No modest answers allowed.",
    options: [
      { letter: 'A', text: "The therapist friend who solves everyone's life crises.", archetype: 'cinnamon' },
      { letter: 'B', text: "The chaos generator who makes every dull day unhinged.", archetype: 'chaos' },
      { letter: 'C', text: "The quiet legend who is secretly running everything.", archetype: 'legend' },
      { letter: 'D', text: "The walking meme who laughs at their own jokes first.", archetype: 'survivor' }
    ]
  },
  {
    id: 5,
    question: "Your brain's preferred activity at 2:17 AM:",
    context: "The sacred witching hour of the mind.",
    options: [
      { letter: 'A', text: "Replaying an embarrassing sentence I uttered in 2017.", archetype: 'cinnamon' },
      { letter: 'B', text: "Planning a completely new life, career, and aesthetic empire.", archetype: 'survivor' },
      { letter: 'C', text: "Contemplating the fabric of the universe while craving cereal.", archetype: 'chaos' },
      { letter: 'D', text: "Sleeping peacefully like a hibernating baby bear (rare mythical breed).", archetype: 'goblin' }
    ]
  }
];

export interface ArchetypeResult {
  id: string;
  name: string;
  emoji: string;
  subtitle: string;
  description: string;
  superpower: string;
  kryptonite: string;
  serotoninBooster: string;
  prescription: string;
  color: string;
  stats: {
    cozyLevel: number;
    chaosEnergy: number;
    heartPurity: number;
    unbotheredVibe: number;
  };
}

export const ARCHETYPES: Record<string, ArchetypeResult> = {
  cinnamon: {
    id: 'cinnamon',
    name: "The Overthinking Sunshine",
    emoji: "🧁",
    subtitle: "Pure gold heart, overthinking CPU running at 400%",
    description: "You feel deeply, care intensely about others, and apologize when someone else bumps into you. Your superpower is making people feel heard, safe, and loved.",
    superpower: "Empathy radar that detects when a friend is 2% sad.",
    kryptonite: "Unanswered text messages that could mean literally anything.",
    serotoninBooster: "Warm beverages, handwritten notes, and being told 'you did great.'",
    prescription: "1 cup of chamomile tea, silence all notifications for 1 hour, and stop worrying about that thing you said 3 days ago.",
    color: "from-pink-500/20 to-purple-500/20 border-pink-500/40 text-pink-300",
    stats: { cozyLevel: 88, chaosEnergy: 42, heartPurity: 99, unbotheredVibe: 35 }
  },
  goblin: {
    id: 'goblin',
    name: "The Cozy Goblin",
    emoji: "🍵",
    subtitle: "Professional cocoon dweller & supreme comfort specialist",
    description: "You have elevated napping, soft lighting, and oversized hoodies to a high art form. Cancelled plans are your personal birthday present from the universe.",
    superpower: "Can find the softest spot in any room within 3.2 seconds.",
    kryptonite: "Plans before 11 AM and tight jeans.",
    serotoninBooster: "Heavy blankets, fresh bakery smells, and rain hitting the windowpane.",
    prescription: "Uninterrupted horizontal time, a giant bowl of carbs, and zero social obligations.",
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-300",
    stats: { cozyLevel: 100, chaosEnergy: 20, heartPurity: 90, unbotheredVibe: 85 }
  },
  chaos: {
    id: 'chaos',
    name: "The Agent of Wholesome Chaos",
    emoji: "⚡",
    subtitle: "Spontaneous sparkle bomb & relentless laugh manufacturer",
    description: "Life is rarely boring within a 20-meter radius of you. You run on unpredictable whims, weird hyper-fixations, and an ability to make any mundane errand feel like a heist.",
    superpower: "Turning a boring Tuesday into a hilarious core memory.",
    kryptonite: "Sitting still in quiet rooms with no background stimulation.",
    serotoninBooster: "Silly dance breaks, sending unhinged memes, and sudden 11 PM ideas.",
    prescription: "Blast your favorite hype anthem, share 3 absurd memes, and create something wild.",
    color: "from-amber-500/20 to-yellow-500/20 border-amber-500/40 text-amber-300",
    stats: { cozyLevel: 45, chaosEnergy: 98, heartPurity: 92, unbotheredVibe: 65 }
  },
  legend: {
    id: 'legend',
    name: "The Quiet Legend",
    emoji: "🕶️",
    subtitle: "Effortlessly unbothered, observant, and subtly brilliant",
    description: "You don't need to speak often, but when you do, it's either an absolute mic-drop one-liner or profound wisdom. You observe everything while maintaining peak inner zen.",
    superpower: "Radiates calm authority even when the group chat is on fire.",
    kryptonite: "Small talk about the weather with people you barely know.",
    serotoninBooster: "Solitude with good headphones, rainy playlists, and completing a personal project quietly.",
    prescription: "Two hours of quiet autonomy, favorite instrumental music, and zero unsolicited advice.",
    color: "from-indigo-500/20 to-blue-500/20 border-indigo-500/40 text-indigo-300",
    stats: { cozyLevel: 75, chaosEnergy: 30, heartPurity: 88, unbotheredVibe: 98 }
  },
  survivor: {
    id: 'survivor',
    name: "The Dramatic Survivor",
    emoji: "👑",
    subtitle: "Surviving life with cinematic flair, iced coffee, and humor",
    description: "Whatever chaos life throws at you, you deliver a monologue, sip an iced beverage, and somehow conquer the dragon anyway. You turn struggles into hilarious stories.",
    superpower: "Transforming stressful disasters into golden stand-up comedy.",
    kryptonite: "Mild inconveniences when your blood sugar or caffeine is low.",
    serotoninBooster: "Dramatic sighs, retail therapy for cute stationery, and beating the odds in style.",
    prescription: "A cold beverage with a fancy straw, acknowledging your own badassery, and 10 minutes of majestic venting.",
    color: "from-rose-500/20 to-red-500/20 border-rose-500/40 text-rose-300",
    stats: { cozyLevel: 60, chaosEnergy: 80, heartPurity: 91, unbotheredVibe: 70 }
  }
};
