import { ReactNode } from 'react';

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
export type ErrorBoundaryProps = {
  children: ReactNode;
};

export type DataHomeWorkType = {
  climate: string;
  temperate: string;
  created: string;
  diameter: string;
  edited: string;
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  rotation_period: string;
  surface_water: string;
  terrain: string;
};
export type InfoType = {
  homeWordLink: string;
  name: string;
  setIsOpenInfo: React.Dispatch<React.SetStateAction<boolean>>;
};
export type DataType = {
  count: number;
  next: string;
  previous: string | null;
  results: ItemType[];
};

export type PaginateType = {
  nextPage: number;
  prevPage: number;
  count: number;
  maxPage: number;
  searchQuery: string | null;
};
export type PaginationProps = {
  paginateConfig: PaginateType;
};
export type ErrorResponse = {
  status: number;
  statusText: string;
  message?: string;
};
