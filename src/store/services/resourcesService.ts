import { Query } from "../types/query";
import { Message } from "../actions/action";
import { Resource } from "../reducers/resource";
import { Wrapper } from "../reducers/wrapper";
import { ResourceList } from "../reducers/resources";
import { Film } from "../types/film";
import { People } from "../types/people";
import { Planet } from "../types/planet";
import { Species } from "../types/species";
import { Starship } from "../types/starship";
import { Vehicle } from "../types/vehicle";

const BASE_URL = "https://swapi.dev/api/";
class ResourcesServices {
  constructor() {
    this.fetchResource = this.fetchResource.bind(this);
    this.fetchResourceList = this.fetchResourceList.bind(this);
  }
  // id as an whole url
  public async fetchResource<
    T extends Film | People | Planet | Species | Starship | Vehicle
  >({
    resourceName,
    id
  }: Query): Promise<Omit<Resource<T>, "schema"> | Message> {
    if (!id || !resourceName) {
      return { message: "Bad url" };
    }
    try {
      const response = await fetch(id);
      const { status } = response;
      if (status !== 200) {
        return { message: "Error in Api" };
      }
      const resource = (await response.json()) as T;
      return { resourceName, resource };
    } catch {
      return { message: "Could not connect to server" };
    }
  }
  public async fetchResourceList<T>(
    query: Query
  ): Promise<Omit<ResourceList<T>, "schema"> | Message> {
    try {
      const params: any = {};
      if (query.pageNumber) {
        params.page = query.pageNumber;
      }
      if (query.search) {
        params.search = query.search;
      }
      if (!query.resourceName) {
        return { message: "Resource name is mandatory" };
      }
      const response = await fetch(
        BASE_URL +
          query.resourceName +
          "/?" +
          new URLSearchParams(params).toString()
      );
      const { status } = response;
      if (status !== 200) {
        return { message: "Error in Api" };
      }
      const resources = await response.json();
      return {
        name: query.resourceName,
        resources: resources.results,
        next: resources.next,
        previous: resources.previous
      };
    } catch {
      return { message: "Could not connect to server" };
    }
  }
  public async fetchResourceSchema<T>({
    resourceName
  }: Query): Promise<Pick<ResourceList<T>, "schema"> | Message> {
    try {
      if (!resourceName) {
        return { message: "Resource name is mandatory" };
      }
      const response = await fetch(BASE_URL + resourceName + "/schema");
      const { status } = response;
      if (status !== 200) {
        return { message: "Error in Api" };
      }
      const resources = await response.json();
      let schema: any = {};
      // remove unneeded property description
      for (let property in resources.properties) {
        schema[property] = { type: resources.properties[property].type };
      }
      return { schema };
    } catch {
      return { message: "Could not connect to server" };
    }
  }

  public async fetchAvailableResources(): Promise<
    Message | Wrapper["availableResources"]
  > {
    try {
      const response = await fetch(BASE_URL);
      const { status } = response;
      if (status !== 200) {
        return { message: "Error in Api" };
      }
      const resources = (await response.json()) as Wrapper["availableResources"];
      return { ...resources };
    } catch {
      return { message: "Could not connect to server" };
    }
  }
}
export const resourcesService = new ResourcesServices();
