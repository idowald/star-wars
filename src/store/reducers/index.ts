import { combineReducers } from "redux";
import { wrapper, initialWrapper } from "./wrapper";
import { initialResources, resources } from "./resources";
import { initialResource, resource } from "./resource";

export interface State {
  wrapper: typeof initialWrapper;
  resources: typeof initialResources;
  resource: typeof initialResource;
}

export const reducer = combineReducers<State>({
  wrapper,
  resources,
  resource
});
