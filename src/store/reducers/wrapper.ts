import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Query } from "../types/query";
import {
  changeDisplay,
  closeModal,
  openModal,
} from "../actions/action";
import {
  getAvailableResources,
  getResources,
  getSingleResource
} from "../actions/resources";

export type ResourceName =
  | "films"
  | "people"
  | "planets"
  | "species"
  | "vehicles"
  | "starships";
export const resourcesNames: { [key in ResourceName]: string } = {
  films: "",
  people: "",
  planets: "",
  species: "",
  vehicles: "",
  starships: ""
};
export const displays: Display[] = ["grid", "list", "detailed"];
export type Display = "grid" | "list" | "detailed";
export interface Wrapper {
  display: Display;
  query: Query;
  availableResources: typeof resourcesNames;
  message: string | null;
  requestStatus: { [key: string]: boolean }; //a map of all loading requests by timestamp
  isModalOpen: boolean;
}

export const initialWrapper: Wrapper = {
  display: "grid",
  availableResources: resourcesNames,
  message: null,
  query: { search: null, id: null, pageNumber: null, resourceName: null },
  requestStatus: {},
  isModalOpen: false
};
export const wrapper = reducerWithInitialState(initialWrapper);
export const getAvailableResourcedReducer  = ({ requestStatus, ...state }:Wrapper, { timestamp }: {timestamp : string} ):Wrapper => {
  return {
    ...state,
    requestStatus: { ...requestStatus, [timestamp]: true }
  };
};
wrapper.case(
  getAvailableResources.started,
  getAvailableResourcedReducer
);
export const getAvailableResourcesFailed = ({ requestStatus, ...state }: Wrapper, { params: { timestamp }  }: {params : {timestamp : string}}) => {
  return {
    ...state,
    requestStatus: { ...requestStatus, [timestamp]: false }
  };
};
wrapper.case(
  getAvailableResources.failed,
    getAvailableResourcesFailed
);

wrapper.case(
  getAvailableResources.done,
  (
    { query, requestStatus, ...state },
    { result: { resourceNames }, params: { timestamp } }
  ) => {
    const firstAvailableResource = Object.keys(resourceNames).find(
      resource => !!resource
    ) as ResourceName;
    return {
      ...state,
      query: { ...query, resourceName: firstAvailableResource },
      availableResources: resourceNames,
      requestStatus: { ...requestStatus, [timestamp]: false }
    };
  }
);
wrapper.cases(
  [getResources.started, getSingleResource.started],
  ({ query, requestStatus, ...state }, { timestamp, ...newQuery }) => {
    return {
      ...state,
      query: { ...query, ...newQuery },
      requestStatus: { ...requestStatus, [timestamp]: true }
    };
  }
);
wrapper.cases(
  [getResources.failed, getSingleResource.failed],
  (
    { requestStatus, ...state },
    { error: { message }, params: { timestamp } }
  ) => {
    return {
      ...state,
      message,
      requestStatus: { ...requestStatus, [timestamp]: false }
    };
  }
);
wrapper.cases(
  [getResources.done, getSingleResource.done],
  ({ requestStatus, ...state }, { params: { timestamp } }) => {
    return {
      ...state,
      requestStatus: { ...requestStatus, [timestamp]: false }
    };
  }
);

wrapper.case(changeDisplay, (state: Wrapper, { display }) => ({
  ...state,
  display
}));
wrapper.case(openModal, (state: Wrapper) => ({ ...state, isModalOpen: true }));
wrapper.case(closeModal, (state: Wrapper) => ({
  ...state,
  isModalOpen: false
}));
