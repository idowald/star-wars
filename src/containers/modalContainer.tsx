import { connect } from "react-redux";
import { State } from "../store/reducers";

import { ResourceModal } from "../components/resourceModal";
import { closeModal, openModal } from "../store/actions/action";
import { ResourceName } from "../store/reducers/wrapper";

export const ModalContainer = connect(
  ({ resource, wrapper: { requestStatus, isModalOpen } }: State) => ({
    resource,
    isLoading: Object.values(requestStatus).includes(true),
    isModalOpen
  }),
  dispatch => ({
    closeModal: () => dispatch(closeModal({})),
    openModal: (url: string) => {
      const urlSplit = url.split("/");
      const resourceName = urlSplit[urlSplit.length - 3] as ResourceName;
      return dispatch(openModal({ id: url, resourceName }));
    }
  })
)(ResourceModal);
