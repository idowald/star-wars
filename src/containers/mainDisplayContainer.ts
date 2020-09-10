import { connect } from "react-redux";
import { State } from "../store/reducers";
import { MainDisplay } from "../components/mainDisplay";
import { openModal } from "../store/actions/action";
import { ResourceName } from "../store/reducers/wrapper";
import { getResources } from "../store/actions/resources";

export const MainDisplayContainer = connect(
  ({ wrapper: { display, requestStatus }, resources }: State) => {
    const requests = Object.keys(requestStatus).filter(resourceStatus =>
      resourceStatus.startsWith(getResources.started.type)
    );
    return {
      activeDisplay: display,
      resources,
      isLoading: !!requests.find(
        resourceStatus => requestStatus[resourceStatus]
      )
    };
  },
  dispatch => ({
    openModal: (url: string) => {
      const urlSplitted = url.split("/");
      const resourceName = urlSplitted[urlSplitted.length - 3] as ResourceName;
      return dispatch(openModal({ id: url, resourceName }));
    }
  })
)(MainDisplay);
