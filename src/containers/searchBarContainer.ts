import { connect } from "react-redux";
import { State } from "../store/reducers";
import { SearchBar } from "../components/searchBar";
import { getResources } from "../store/actions/resources";
import { Query } from "../store/types/query";
import { ResourceName } from "../store/reducers/wrapper";

export const SearchBarContainer = connect(
  ({
    wrapper: {
      query: { search, resourceName }
    }
  }: State) => ({
    search: search ? search : "",
    resourceName: resourceName as ResourceName
  }),
  dispatch => ({
    searchAction: (resourceName: ResourceName) => ({
      search
    }: {
      search: string;
    }) => {
      const query: Query = { search, resourceName };
      dispatch(
        getResources.started({
          ...query,
          timestamp: getResources.started.type + new Date().getTime().toString()
        })
      );
    }
  }),
  ({ resourceName, ...stateProps }, { searchAction }) => ({
    ...stateProps,
    searchAction: searchAction(resourceName)
  })
)(SearchBar);
