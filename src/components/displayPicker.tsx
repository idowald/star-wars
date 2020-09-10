import * as React from "react";
import { Display, displays } from "../store/reducers/wrapper";

interface Props {
  pickDisplay: (display: Display) => void;
}

export const DisplayPicker = ({ pickDisplay }: Props) => {
  return (
    <div>
      {displays.map(display => (
        <div key={display} onClick={() => pickDisplay(display)}>
          {display}
        </div>
      ))}
    </div>
  );
};
