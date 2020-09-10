import { all, put, call, select } from "redux-saga/effects";
import {
  getAvailableResources,
  getResources,
  getSingleResource
} from "../actions/resources";
import { resourcesService } from "../services/resourcesService";
import { ResourceName } from "../reducers/wrapper";
import { State } from "../reducers";

export function* fetchAllAvailableResources({
  payload: { timestamp }
}: ReturnType<typeof getAvailableResources.started>) {
  const resources = yield call(resourcesService.fetchAvailableResources);
  const { message } = resources;
  if (message) {
    yield put(
      getAvailableResources.failed({
        error: { message },
        params: { timestamp }
      })
    );
  } else {
    yield put(
      getAvailableResources.done({
        result: { resourceNames: resources },
        params: { timestamp }
      })
    );
  }
}
export function* fetchFirstAvailableResource() {
  const resourceName: ResourceName = yield select(
    (state: State) => state.wrapper.query.resourceName
  );
  yield put(
    getResources.started({
      resourceName,
      timestamp: getResources.started.type + new Date().getTime().toString()
    })
  );
}

export function* fetchResources({
  payload: { timestamp, ...query }
}: ReturnType<typeof getResources.started>) {
  //parallel call
  const [resources, { schema }] = yield all([
    yield call(resourcesService.fetchResourceList, query),
    yield call(resourcesService.fetchResourceSchema, query)
  ]);
  const { message } = resources;
  if (message) {
    yield put(
      getResources.failed({ error: { message }, params: { timestamp } })
    );
  } else {
    yield put(
      getResources.done({
        result: { ...resources, schema },
        params: { timestamp }
      })
    );
  }
}

export function* fetchSingleResource({
  payload: { timestamp, ...query }
}: ReturnType<typeof getSingleResource.started>) {
  const [resources, schema] = yield all([
    yield call(resourcesService.fetchResource, query),
    yield call(resourcesService.fetchResourceSchema, query)
  ]);
  const { message } = resources;
  if (message) {
    yield put(
      getSingleResource.failed({ error: { message }, params: { timestamp } })
    );
  } else {
    yield put(
      getSingleResource.done({ ...resources, ...schema, params: { timestamp } })
    );
  }
}
