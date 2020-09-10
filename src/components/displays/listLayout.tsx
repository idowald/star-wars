import * as React from "react";
import { MainProps } from "../mainDisplay";

export const ListLayout = (
  props: Omit<MainProps, "activeDisplay" | "isLoading">
) => {
  return <div>List {JSON.stringify(props)}</div>;
};
