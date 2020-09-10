import actionCreatorFactory, { ActionCreator } from "typescript-fsa";
import { ResourceName, Wrapper } from "../reducers/wrapper";
import { Query } from "../types/query";
const factory = actionCreatorFactory();

export const createAction = <T>(type: string): ActionCreator<T> => {
  const actionCreator = factory<T>(type);
  actionCreator.toString = () => type;
  return actionCreator;
};
export type Message = { message: string };
export type Timestamp = { timestamp: string };

export const createActionResource = <Payload>(type: string) => {
  const actionCreatorTrigger = factory.async<
    Query & Timestamp,
    Payload,
    Message
  >(type);
  return actionCreatorTrigger;
};
// a simple fix for debouncing problem with multi clicks (there is not trigger to async actions)
export const changePage = createAction<{
  pageNumber: string;
  resourceName: ResourceName;
}>("CHANGE_PAGE");
export const changeDisplay = createAction<Pick<Wrapper, "display">>(
  "CHANGE_DISPLAY"
);
export const openModal = createAction<Query>("OPEN_MODAL");
export const closeModal = createAction<{}>("CLOSE_MODAL");

export const setPristine = createAction<{}>("SET_PRISTINE");
