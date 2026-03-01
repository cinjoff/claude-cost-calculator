export interface Item {
  id: string;
  label: string;
  price: number;
  weight: number; // higher = more likely to appear
}

export const ITEMS: Item[] = [
  { id: 'beer',        label: 'Beer',        price: 5.00,  weight: 10 },
  { id: 'coffee',      label: 'Coffee',      price: 4.50,  weight: 10 },
  { id: 'wine',        label: 'Wine',        price: 6.00,  weight: 8  },
  { id: 'cinema',      label: 'Cinema',      price: 14.00, weight: 5  },
  { id: 'stroopwafel', label: 'Stroopwafel', price: 0.50,  weight: 8  },
  { id: 'kroket',      label: 'Kroket',      price: 2.50,  weight: 7  },
  { id: 'broodje',     label: 'Broodje',     price: 5.50,  weight: 7  },
  { id: 'tram',        label: 'Tram',        price: 3.20,  weight: 6  },
  { id: 'burger',      label: 'Burger',      price: 17.00, weight: 4  },
  { id: 'pizza',       label: 'Pizza',       price: 20.00, weight: 3  },
  { id: 'weed',        label: 'Weed',        price: 12.00, weight: 3  },
  { id: 'cocaine',     label: 'Cocaine',     price: 60.00, weight: 1  },
  { id: 'bj',          label: 'BJ',          price: 30.00, weight: 1  },
];

export const PLANS = {
  pro: { label: 'Pro', price: 19 },
  max: { label: 'Max', price: 95 },
} as const;

export type PlanKey = keyof typeof PLANS;
