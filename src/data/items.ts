export interface Item {
  id: string;
  label: string;
  price: number;
  weight: number;    // higher = more likely to appear
  dopamineMins: number; // how long the dopamine hit lasts
  qtyMin?: number;  // minimum quantity (default 1)
  qtyMax?: number;  // maximum quantity (default 4)
}

export const ITEMS: Item[] = [
  { id: 'beer',        label: 'Beer',        price: 5.00,  weight: 10, dopamineMins: 45  },
  { id: 'coffee',      label: 'Coffee',      price: 4.50,  weight: 10, dopamineMins: 120 },
  { id: 'wine',        label: 'Wine',        price: 6.00,  weight: 8,  dopamineMins: 90  },
  { id: 'cinema',      label: 'Cinema',      price: 14.00, weight: 5,  dopamineMins: 120, qtyMax: 2 },
  { id: 'stroopwafel', label: 'Stroopwafel', price: 0.50,  weight: 8,  dopamineMins: 3   },
  { id: 'kroket',      label: 'Kroket',      price: 2.50,  weight: 7,  dopamineMins: 8   },
  { id: 'broodje',     label: 'Broodje',     price: 5.50,  weight: 7,  dopamineMins: 15  },
  { id: 'tram',        label: 'Tram ride',   price: 3.20,  weight: 6,  dopamineMins: 20  },
  { id: 'burger',      label: 'Burger',      price: 17.00, weight: 4,  dopamineMins: 25, qtyMin: 2, qtyMax: 2 },
  { id: 'pizza',       label: 'Pizza',       price: 20.00, weight: 3,  dopamineMins: 30, qtyMax: 3 },
  { id: 'weed',        label: 'Weed',        price: 12.00, weight: 3,  dopamineMins: 240 },
  { id: 'cocaine',     label: 'Cocaine',     price: 60.00, weight: 1,  dopamineMins: 20  },
  { id: 'margaritas',  label: 'Margaritas',  price: 15.00, weight: 2,  dopamineMins: 90, qtyMin: 3, qtyMax: 3 },
  { id: 'tacos',       label: 'Tacos',       price: 10.00, weight: 2,  dopamineMins: 20, qtyMin: 3, qtyMax: 3 },
];

export const PLANS = {
  pro: { label: 'Pro', price: 19 },
  max: { label: 'Max', price: 95 },
} as const;

export type PlanKey = keyof typeof PLANS;

// Claude dopamine: full month of access = 43,200 minutes
export const CLAUDE_DOPAMINE_MINS = 43_200;
