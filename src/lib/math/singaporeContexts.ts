interface ContextData {
  places?: readonly string[];
  items?: readonly string[];
  modes?: readonly string[];
  hawker?: readonly string[];
  drinks?: readonly string[];
  malls?: readonly string[];
  attractions?: readonly string[];
  types?: readonly string[];
  activities?: readonly string[];
  events?: readonly string[];
  collection: readonly string[];
  verbs: readonly string[];
  locations?: readonly string[];
  commonPrices?: number[] | Record<string, number[]>;
}

interface SingaporeContextsType {
  shopping: ContextData;
  transport: ContextData;
  food: ContextData;
  places: ContextData;
  school: ContextData;
  festivals: ContextData;
  currency: string;
  currencySymbol: string;
}

export const singaporeContexts: SingaporeContextsType = {
  shopping: {
    places: [
      'NTUC FairPrice',
      'Giant',
      'Cold Storage',
      'Sheng Siong',
      'Prime Supermarket',
      'Don Don Donki',
      'Mustafa Centre',
      'Popular Bookstore',
      'Daiso',
      'Value Dollar',
    ],
    items: [
      'school books',
      'assessment books',
      'pencils',
      'erasers',
      'water bottles',
      'stationery sets',
      'notebooks',
      'color pencils',
      'school bags',
      'lunch boxes',
    ],
    collection: ['shopping cart', 'basket', 'shelf', 'box', 'pack'],
    verbs: ['bought', 'purchased', 'selected', 'chose', 'picked'],
    commonPrices: [1.5, 2, 2.5, 3.5, 4, 4.5, 5, 7.5, 10, 12.5],
  },
  transport: {
    modes: [
      'MRT',
      'public bus',
      'school bus',
      'taxi',
      'private bus',
      'LRT',
      'Grab car',
      'shuttle bus',
      'double-decker bus',
      'express bus',
    ],
    collection: ['group', 'batch', 'line', 'queue', 'crowd'],
    verbs: ['boarded', 'took', 'rode', 'travelled by', 'commuted by'],
    locations: [
      'Orchard MRT',
      'Tampines Bus Interchange',
      'Jurong East station',
      'Bishan Junction',
      'Woodlands Interchange',
    ],
    commonPrices: [1.5, 2, 2.5, 3, 3.5],
  },
  food: {
    items: [
      'chicken rice',
      'roti prata',
      'nasi lemak',
      'laksa',
      'satay',
      'char kway teow',
      'mee goreng',
      'curry puff',
      'kaya toast',
      'chilli crab',
    ],
    hawker: [
      'bowl of fishball noodles',
      'plate of chicken rice',
      'serving of nasi lemak',
      'bowl of laksa',
      'plate of char kway teow',
      'serving of carrot cake',
      'bowl of bak kut teh',
      'plate of economic rice',
      'bowl of yong tau foo',
      'serving of thunder tea rice',
    ],
    drinks: [
      'teh tarik',
      'kopi',
      'bandung',
      'milo dinosaur',
      'sugar cane juice',
      'soya bean milk',
      'bubble tea',
      'lime juice',
      'grass jelly drink',
      'coconut water',
    ],
    collection: ['plate', 'bowl', 'set', 'packet', 'serving'],
    verbs: ['ordered', 'bought', 'ate', 'shared', 'packed'],
    locations: [
      'hawker centre',
      'food court',
      'kopitiam',
      'coffee shop',
      'canteen',
      'restaurant',
    ],
    commonPrices: {
      hawker: [3, 4, 5, 6, 7, 8],
      drinks: [1.2, 1.5, 2, 2.5, 3],
      snacks: [1, 1.5, 2, 2.5],
    },
  },
  places: {
    malls: [
      'Tampines Mall',
      'Jurong Point',
      'NEX',
      'VivoCity',
      'Ion Orchard',
      'Suntec City',
      'Junction 8',
      'Northpoint City',
      'Causeway Point',
      'Compass One',
    ],
    attractions: [
      'Gardens by the Bay',
      'Sentosa',
      'East Coast Park',
      'Singapore Zoo',
      'Universal Studios',
      'Jewel Changi',
      'Botanic Gardens',
      'Marina Bay Sands',
      'Science Centre',
      'Wild Wild Wet',
    ],
    collection: ['group', 'class', 'family', 'tour group', 'batch'],
    verbs: ['visited', 'went to', 'explored', 'toured', 'spent time at'],
    commonPrices: {
      attractions: [20, 25, 30, 35, 40, 45, 50],
      activities: [10, 15, 20, 25, 30],
    },
  },
  school: {
    types: [
      'primary school',
      'secondary school',
      'tuition centre',
      'enrichment centre',
      'student care centre',
    ],
    activities: [
      'badminton session',
      'swimming lesson',
      'piano class',
      'art class',
      'tuition class',
      'soccer practice',
      'dance class',
      'Chinese lesson',
      'coding workshop',
      'math olympiad',
    ],
    items: [
      'textbooks',
      'exercise books',
      'worksheets',
      'assessment papers',
      'project materials',
      'school uniforms',
      'PE attire',
      'water bottles',
      'pencil cases',
      'school bags',
    ],
    collection: ['class', 'group', 'team', 'club', 'cohort'],
    verbs: ['studied', 'completed', 'submitted', 'scored', 'participated in'],
    locations: ['classroom', 'library', 'hall', 'lab', 'canteen', 'field'],
    commonPrices: {
      supplies: [2, 3, 4, 5, 7.5, 10],
      activities: [15, 20, 25, 30, 35, 40],
    },
  },
  festivals: {
    events: [
      'Chinese New Year',
      'Hari Raya',
      'Deepavali',
      'Mid-Autumn Festival',
      'National Day',
      'Christmas',
      'Vesak Day',
      'Thaipusam',
    ],
    items: [
      'red packets',
      'mooncakes',
      'cookies',
      'decorations',
      'lanterns',
      'greeting cards',
      'gifts',
      'snacks',
    ],
    collection: ['box', 'pack', 'set', 'basket', 'container'],
    verbs: ['celebrated', 'prepared', 'shared', 'gave out', 'received'],
    locations: [
      'home',
      'community centre',
      'temple',
      'mosque',
      'church',
      'shopping mall',
    ],
    commonPrices: {
      gifts: [8, 10, 12, 15, 20, 25],
      food: [5, 8, 10, 12, 15],
    },
  },
  currency: 'SGD',
  currencySymbol: '$',
} as const;

export type SingaporeContextKey = keyof Omit<
  SingaporeContextsType,
  'currency' | 'currencySymbol'
>;

export interface ContextTemplate {
  items?: readonly string[];
  collection: readonly string[];
  verbs: readonly string[];
  locations?: readonly string[];
  commonPrices?: number[] | Record<string, number[]>;
}

export function getRandomPrice(
  context: SingaporeContextKey,
  subCategory?: string
): number {
  const contextData = singaporeContexts[context] as ContextData;
  const prices = contextData.commonPrices;
  if (!prices) return 0;

  if (Array.isArray(prices)) {
    return prices[Math.floor(Math.random() * prices.length)];
  }

  if (subCategory && subCategory in prices) {
    const categoryPrices = prices[subCategory];
    return categoryPrices[Math.floor(Math.random() * categoryPrices.length)];
  }

  // Default to first category if subCategory not found
  const firstCategory = Object.values(prices)[0];
  return firstCategory[Math.floor(Math.random() * firstCategory.length)];
}

export function getRandomItems(
  context: SingaporeContextKey,
  count: number = 2,
  subCategory?: keyof Omit<
    ContextData,
    'collection' | 'verbs' | 'locations' | 'commonPrices'
  >
): string[] {
  const contextData = singaporeContexts[context] as ContextData;
  let items: readonly string[] = [];

  const isStringArray = (value: unknown): value is readonly string[] =>
    Array.isArray(value) && value.length > 0 && typeof value[0] === 'string';

  if (subCategory && subCategory in contextData) {
    const value = contextData[subCategory];
    if (isStringArray(value)) {
      items = value;
    }
  } else if ('items' in contextData && contextData.items) {
    items = contextData.items;
  } else {
    // Try to find any array of items in the context
    const arrayKeys = Object.keys(contextData).filter((key) => {
      if (['collection', 'verbs', 'locations', 'commonPrices'].includes(key)) {
        return false;
      }
      const value = contextData[key as keyof ContextData];
      return isStringArray(value);
    });
    if (arrayKeys.length > 0) {
      const firstKey = arrayKeys[0] as keyof ContextData;
      const value = contextData[firstKey];
      if (isStringArray(value)) {
        items = value;
      }
    }
  }

  if (items.length === 0) return [];

  // Shuffle and take first 'count' items
  return [...items]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(count, items.length));
}

export function getContextTemplate(
  context: SingaporeContextKey
): ContextTemplate {
  const contextData = singaporeContexts[context] as ContextData;
  return {
    items: contextData.items,
    collection: contextData.collection,
    verbs: contextData.verbs,
    locations: contextData.locations,
    commonPrices: contextData.commonPrices,
  };
}
