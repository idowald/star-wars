import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Film } from "../types/film";
import { People } from "../types/people";
import { Planet } from "../types/planet";
import { Species } from "../types/species";
import { Starship } from "../types/starship";
import { Vehicle } from "../types/vehicle";
import { ResourceName } from "./wrapper";
import { getSingleResource } from "../actions/resources";
import { initialResources } from "./resources";

export interface Resource<
  T extends Film | People | Planet | Species | Starship | Vehicle
> {
  resourceName: ResourceName;
  resource: T | null;
  schema: typeof initialResources["schema"];
}
export type ResourceState = Resource<
  Film | People | Planet | Species | Starship | Vehicle
>;

export const initialResource: ResourceState = {
  resourceName: "people",
  resource: null,
  schema: {}
};
export const resource = reducerWithInitialState(initialResource);
// @ts-ignore
resource.case(getSingleResource.done, (state, { params, ...resource }) => {
  return { ...resource };
});
