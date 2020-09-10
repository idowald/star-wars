import * as React from "react";
import { MainProps } from "../mainDisplay";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@material-ui/core";
import { ResourceRow } from "./resourceRow";

export const GridLayout = (
  props: Omit<MainProps, "activeDisplay" | "isLoading">
) => {
  let properties: string[] = [];
  if (props.resources && props.resources.resources.length) {
    properties = Object.keys(props.resources.resources[0]).filter(
      key => key !== "created" && key !== "edited" && key !== "url"
    );
  }
  if (props.resource && props.resource.resource) {
    properties = Object.keys(props.resource.resource).filter(
      key => key !== "created" && key !== "edited" && key !== "url"
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell>created</TableCell>
            <TableCell>edited</TableCell>
            {properties.map(property => (
              <TableCell key={property}>{property}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.resource ? (
            <TableRow>
              <ResourceRow
                resource={props.resource.resource}
                openModal={props.openModal}
              />
            </TableRow>
          ) : (
            props.resources &&
            props.resources.resources.map(resource => (
              <TableRow key={resource.url}>
                <ResourceRow resource={resource} openModal={props.openModal} />
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
