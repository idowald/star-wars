import React from "react";
import { Field, Form } from "react-final-form";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface Props {
  search: string;
  searchAction: (submit: { search: string }) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
      justifyContent: "space-evenly",
      width: "20%",
      alignItems: "baseline"
    }
  })
);
export const SearchBar = ({ search, searchAction }: Props) => {
  const classes = useStyles();

  return (
    <Form
      onSubmit={searchAction}
      initialValues={{ search }}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit} className={classes.form}>
          <label>Search</label>
          <Field
            name="search"
            component="input"
            type="text"
            placeholder="search..."
          />
          <button
            type="submit"
            disabled={submitting || pristine || !values.search}
          >
            Search
          </button>
        </form>
      )}
    />
  );
};
