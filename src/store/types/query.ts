import { ResourceName } from "../reducers/wrapper";

export interface Query {
  search?: string | null;
  id?: string | null;
  pageNumber?: string | null;
  resourceName?: ResourceName | null;
}
