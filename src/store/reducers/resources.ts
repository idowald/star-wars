import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Film } from "../types/film";
import { People } from "../types/people";
import { Planet } from "../types/planet";
import { Species } from "../types/species";
import { Starship } from "../types/starship";
import { Vehicle } from "../types/vehicle";
import { ResourceName } from "./wrapper";
import { getResources } from "../actions/resources";

export interface ResourceList<T> {
  name: ResourceName;
  resources: T[];
  next: string | null;
  previous: string | null;
  schema: { [property: string]: { type: string; format: string | null } } | {};
}
export type ResourceListState = ResourceList<
  Film | People | Planet | Species | Starship | Vehicle
>;

export const initialResources: ResourceListState = {
  name: "people",
  resources: [],
  next: null,
  previous: null,
  schema: {}
};
export const resources = reducerWithInitialState(initialResources);
resources.case(getResources.done, (state, { result }) => ({ ...result }));
