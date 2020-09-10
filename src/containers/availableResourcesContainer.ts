import { connect } from "react-redux";
import { AvailableResource } from "../components/availableResources";
import { State } from "../store/reducers";
import { ResourceName } from "../store/reducers/wrapper";
import { getResources,getAvailableResources } from "../store/actions/resources";

export const AvailableResourcesContainer = connect(
  ({ wrapper: { availableResources, requestStatus } }: State) => {
      const requests = Object.keys(requestStatus)
          .filter(resourceStatus =>
              resourceStatus.startsWith(getAvailableResources.started.type)
          );
      return ({availableResources, isLoading: !!requests.find(resourceStatus => requestStatus[resourceStatus])});
  },
  dispatch => ({
    changeResource: (resourceName: ResourceName) =>
      dispatch(getResources.started({ resourceName, timestamp: getResources.started.type + new Date().getTime().toString() }))
  })
)(AvailableResource);
