import { Icon, TableCell } from "@material-ui/core";
import { typesRelations } from "../../utils/schema";
import * as React from "react";
import { ResourceState } from "../../store/reducers/resource";
import { MainProps } from "../mainDisplay";
import { typesIcons } from "../../utils/icons";

interface Props {
  resource: ResourceState["resource"];
  openModal: MainProps["openModal"];
}
export const ResourceRow = ({ resource, openModal }: Props) => {
  if (!resource) {
    return <React.Fragment></React.Fragment>;
  }
  const properties = Object.keys(resource).filter(
    key => key !== "created" && key !== "edited" && key !== "url"
  );
  return (
    <React.Fragment>
      <TableCell>{new Date(resource.created).toDateString()}</TableCell>
      <TableCell>{new Date(resource.edited).toDateString()}</TableCell>
      {properties.map((key: string) => {
        // @ts-ignore
        const value = resource[key];
        if (typesRelations.hasOwnProperty(key)) {
          return (
            <TableCell key={key}>
              {Array.isArray(value) ? (
                value.map(relation => (
                  <span key={relation} onClick={() => openModal(relation)}>
                    <Icon>{typesIcons[key]}</Icon>
                  </span>
                ))
              ) : (
                <span onClick={() => openModal(value)}>
                  <Icon>{typesIcons[key]}</Icon>
                </span>
              )}
            </TableCell>
          );
        }
        // Note- I just wanted to show a way that we can render numbers from string, and do manipulation on them if needed
        const number = Number(value);
        if (isNaN(number)) {
          return <TableCell key={key}>{value}</TableCell>;
        } else {
          return <TableCell key={key}>{number}</TableCell>;
        }
      })}
    </React.Fragment>
  );
};
