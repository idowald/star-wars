import * as React from "react";
import { State } from "../store/reducers";
import { ResourceName } from "../store/reducers/wrapper";
import { CircularProgress, createStyles, Icon, Theme } from "@material-ui/core";
import { typesIcons } from "../utils/icons";
import { makeStyles } from "@material-ui/core/styles";

interface PropsInterface {
  changeResource: (resourceName: ResourceName) => void;
  isLoading: boolean;
}
export type Props = Pick<State["wrapper"], "availableResources">;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    availableResources: {
      display: "flex",
      width: "250px",
      justifyContent: "space-evenly"
    },
    spinner: {
      height: "25px !important",
      width: "25px !important"
    }
  })
);
export const AvailableResource = ({
  availableResources,
  changeResource,
  isLoading
}: Props & PropsInterface) => {
  const classes = useStyles();
  return (
    <div className={classes.availableResources}>
      {isLoading ? (
        <CircularProgress className={classes.spinner} />
      ) : (
        Object.keys(availableResources).map(resourceName => (
          <Icon
            key={resourceName}
            onClick={() => changeResource(resourceName as ResourceName)}
          >
            {typesIcons[resourceName]}
          </Icon>
        ))
      )}
    </div>
  );
};
