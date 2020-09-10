import * as React from "react";
import {
  CircularProgress,
  createStyles,
  Modal,
  Theme
} from "@material-ui/core";
import { ResourceState } from "../store/reducers/resource";
import { makeStyles } from "@material-ui/core/styles";
import { GridLayout } from "./displays/gridLayout";
interface Props {
  isLoading: boolean;
  resource: ResourceState;
  isModalOpen: boolean;
  closeModal: () => void;
  openModal: (url: string) => void;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      position: "absolute",
      width: "95%",
      top: "20%",
      height: "550px",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    },
    spinner: {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "100px",
      height: "100px"
    }
  })
);
export const ResourceModal = (props: Props) => {
  const classes = useStyles();
  const body = (
    <div className={classes.modal}>
      <h2 id="simple-modal-title">{props.resource.resourceName}</h2>
      <p id="simple-modal-description">
        {props.isLoading && <CircularProgress className={classes.spinner} />}
        {props.resource && (
          <GridLayout resource={props.resource} openModal={props.openModal} />
        )}
      </p>
    </div>
  );
  return (
    <Modal
      open={props.isModalOpen}
      onClose={props.closeModal}
      aria-labelledby="resource-details"
      aria-describedby="resource-details-modal"
    >
      {body}
    </Modal>
  );
};
