import {
  all,

  takeEvery,
  put,
  takeLatest,
  debounce
} from "redux-saga/effects";
import {
  changePage,
  openModal,
  setPristine
} from "../actions/action";
import {
  getAvailableResources,
  getResources,
  getSingleResource
} from "../actions/resources";
import {
  fetchAllAvailableResources,
  fetchFirstAvailableResource,
  fetchResources,
  fetchSingleResource
} from "./resources";

function* setPristineSaga() {
  // put anything you want to init here
  yield put(
    getAvailableResources.started({
      timestamp:
        getAvailableResources.started.type + new Date().getTime().toString()
    })
  );
}
function* modalOpenSaga({ payload }: ReturnType<typeof openModal>) {

  const timestamp =
    getSingleResource.started.type + new Date().getTime().toString();
  yield put(getSingleResource.started({ ...payload, timestamp }));
}
function* changePageSaga({
  payload: { pageNumber, resourceName }
}: ReturnType<typeof changePage>) {
  yield put(
    getResources.started({
      resourceName,
      pageNumber,
      timestamp: getResources.started.type + new Date().getTime().toString()
    })
  );
}
export default function* root() {
  yield all([
    yield takeEvery(setPristine.type, setPristineSaga),
    yield takeEvery(
      getAvailableResources.started.type,
      fetchAllAvailableResources
    ),
    // take latest so the reducer first set up the success action state ( to get the first available from wrapper reducer
    yield takeLatest(
      getAvailableResources.done.type,
      fetchFirstAvailableResource
    ),
    yield takeLatest(getResources.started.type, fetchResources),
    yield takeEvery(getSingleResource.started.type, fetchSingleResource),
    yield debounce(200, openModal.type, modalOpenSaga),
    yield debounce(400, changePage.type, changePageSaga)
  ]);
}
