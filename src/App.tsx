import React from "react";
import { AppBar, createStyles, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AvailableResourcesContainer } from "./containers/availableResourcesContainer";
// import { DisplayPickerContainer } from "./containers/displayPickerContainer";
import { MainDisplayContainer } from "./containers/mainDisplayContainer";
import { SearchBarContainer } from "./containers/searchBarContainer";
import { ModalContainer } from "./containers/modalContainer";
import { PaginationContainer } from "./containers/paginationContainer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app: {
      margin: "10px"
    },
    appBar: {
      marginBottom: "20px",
      paddingLeft: "10px"
    },
    mainView: {
      background: "#e6e6e6",
      marginTop: "80px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center"
    }
  })
);
function App() {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <AppBar className={classes.appBar}>
        <Typography variant="h2">Starwars</Typography>
      </AppBar>
      <div className={classes.mainView}>
        <AvailableResourcesContainer />
        {/*Note- I did also a display picker to chagne view, but because lack of time i had to stop in the middle*/}
        {/*<DisplayPickerContainer />*/}
        <SearchBarContainer />
        <PaginationContainer />
        <MainDisplayContainer />
      </div>
      <ModalContainer />
    </div>
  );
}

export default App;
