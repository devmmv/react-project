export type ItemType = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};
export type StateType = {
  query: string;
  isLoaded: boolean;
  items: ItemType[];
};

export type SearchSectionProps = {
  parentStateItems: (items: ItemType[]) => void;
  parentStateIsLoaded: (isLoaded: boolean) => void;
};
export type DispalySectionProps = {
  items: ItemType[];
};
