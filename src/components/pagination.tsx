import * as React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
interface Props {
  nextPage: string;
  previousPage: string;
  changePage: (pageNumber: string) => any;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pagination: {
      display: "flex",
      width: "250px",
      justifyContent: "space-between"
    }
  })
);
export const Pagination = (props: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.pagination}>
      {props.previousPage ? (
        <button
          onClick={() => {
            return props.changePage(props.previousPage);
          }}
        >
          Previous page
        </button>
      ) : (
        <span />
      )}
      {props.nextPage ? (
        <button onClick={() => props.changePage(props.nextPage)}>
          Next page
        </button>
      ) : (
        <span />
      )}
    </div>
  );
};
