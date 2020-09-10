import { connect } from "react-redux";
import { State } from "../store/reducers";
import { ResourceName } from "../store/reducers/wrapper";
import { Pagination } from "../components/pagination";
import { changePage } from "../store/actions/action";

export const PaginationContainer = connect(
  ({
    resources,
    wrapper: {
      query: { resourceName }
    }
  }: State) => ({
    nextPage: resources.next ? resources.next.split("page=")[1] : "",
    previousPage: resources.previous
      ? resources.previous.split("page=")[1]
      : "",
    resourceName
  }),
  dispatch => ({
    changePage: (resourceName: ResourceName) => (pageNumber: string) => {
      dispatch(
        changePage({
          pageNumber,
          resourceName
        })
      );
    }
  }),
  ({ resourceName, ...stateProps }, { changePage }) => ({
    ...stateProps,
    changePage: resourceName && changePage(resourceName)
  })
  // @ts-ignore
)(Pagination);
