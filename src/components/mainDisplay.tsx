import * as React from "react";
import { Display} from "../store/reducers/wrapper";
import { GridLayout } from "./displays/gridLayout";
import { ListLayout } from "./displays/listLayout";
import { DetailedLayout } from "./displays/detailedLayout";
import { CircularProgress } from "@material-ui/core";
import type { ResourceState} from "../store/reducers/resource";
import type {ResourceListState} from "../store/reducers/resources";

export interface MainProps {
  activeDisplay: Display;
  resource?: ResourceState;
  resources?: ResourceListState;
  isLoading: boolean;
  openModal: (url: string) => void;
}

const displaySwitch = ({
  activeDisplay,
  resource,
  resources,
  openModal
}: MainProps) => {
  switch (activeDisplay) {
    case "grid":
      return (
        <GridLayout
          resource={resource}
          resources={resources}
          openModal={openModal}
        />
      );
    case "list":
      return (
        <ListLayout
          resource={resource}
          resources={resources}
          openModal={openModal}
        />
      );
    case "detailed":
    default:
      return (
        <DetailedLayout
          resource={resource}
          resources={resources}
          openModal={openModal}
        />
      );
  }
};
export const MainDisplay = (props: MainProps) => {
  if (props.isLoading) {
    return <CircularProgress />;
  } else {
    return displaySwitch(props);
  }
};
