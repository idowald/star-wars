import {getAvailableResourcedReducer, getAvailableResourcesFailed, initialWrapper} from "../wrapper";


test("test wrapper reducer to change the right request status", () => {
  const timestamp = "SOME_PERFECT_TIMESTAMP_2311231";
  const newState = getAvailableResourcedReducer(initialWrapper, {timestamp } );
  expect(newState.requestStatus).toHaveProperty(timestamp);
  expect(newState.requestStatus[timestamp]).toBeTruthy();
  const endState = getAvailableResourcesFailed(newState, {params:{timestamp}});
  expect(endState.requestStatus).toHaveProperty(timestamp);
  expect(endState.requestStatus[timestamp]).toBeFalsy();
});

