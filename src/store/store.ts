import { createStore, applyMiddleware, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import rootSaga from "./sagas";
import { AnyAction } from "typescript-fsa";
import { composeWithDevTools } from "redux-devtools-extension";
import { setPristine } from "./actions/action";
import { reducer, State } from "./reducers";

export default (): Store<State> => {
  const sagaMiddleware = createSagaMiddleware();
  // @ts-ignore
  const store = createStore<State, AnyAction>(
    reducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
  );
  sagaMiddleware.run(rootSaga);
  store.dispatch(setPristine({}));
  return store;
};
