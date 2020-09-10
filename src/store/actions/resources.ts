import { createActionResource } from "./action";
import { resourcesNames } from "../reducers/wrapper";
import { ResourceListState } from "../reducers/resources";
import { ResourceState } from "../reducers/resource";

export const getAvailableResources = createActionResource<{
  resourceNames: typeof resourcesNames;
}>("GET_AVAILABLE_RESOURCES");

export const getResources = createActionResource<ResourceListState>(
  "GET_RESOURCES"
);

export const getSingleResource = createActionResource<ResourceState>(
  "GET_SINGLE_RESOURCE"
);
