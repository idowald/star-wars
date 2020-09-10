import * as React from "react";
import { MainProps } from "../mainDisplay";

export const DetailedLayout = (
  props: Omit<MainProps, "activeDisplay" | "isLoading">
) => {
  return <div>detailed {JSON.stringify(props)}</div>;
};
