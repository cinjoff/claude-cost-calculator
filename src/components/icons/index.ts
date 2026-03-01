export { BeerIcon } from './BeerIcon';
export { CoffeeIcon } from './CoffeeIcon';
export { WineIcon } from './WineIcon';
export { CinemaIcon } from './CinemaIcon';
export { StroopwafelIcon } from './StroopwafelIcon';
export { KroketIcon } from './KroketIcon';
export { BroodjeIcon } from './BroodjeIcon';
export { TramIcon } from './TramIcon';
export { BurgerIcon } from './BurgerIcon';
export { PizzaIcon } from './PizzaIcon';
export { WeedIcon } from './WeedIcon';
export { CocaineIcon } from './CocaineIcon';
export { MargaritasIcon } from './MargaritasIcon';
export { TacosIcon } from './TacosIcon';

import { BeerIcon } from './BeerIcon';
import { CoffeeIcon } from './CoffeeIcon';
import { WineIcon } from './WineIcon';
import { CinemaIcon } from './CinemaIcon';
import { StroopwafelIcon } from './StroopwafelIcon';
import { KroketIcon } from './KroketIcon';
import { BroodjeIcon } from './BroodjeIcon';
import { TramIcon } from './TramIcon';
import { BurgerIcon } from './BurgerIcon';
import { PizzaIcon } from './PizzaIcon';
import { WeedIcon } from './WeedIcon';
import { CocaineIcon } from './CocaineIcon';
import { MargaritasIcon } from './MargaritasIcon';
import { TacosIcon } from './TacosIcon';
import type React from 'react';

export const ITEM_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  beer: BeerIcon,
  coffee: CoffeeIcon,
  wine: WineIcon,
  cinema: CinemaIcon,
  stroopwafel: StroopwafelIcon,
  kroket: KroketIcon,
  broodje: BroodjeIcon,
  tram: TramIcon,
  burger: BurgerIcon,
  pizza: PizzaIcon,
  weed: WeedIcon,
  cocaine: CocaineIcon,
  margaritas: MargaritasIcon,
  tacos: TacosIcon,
};
