import { connect } from "react-redux";
import { Display } from "../store/reducers/wrapper";
import { changeDisplay } from "../store/actions/action";
import { DisplayPicker } from "../components/displayPicker";

export const DisplayPickerContainer = connect(null, dispatch => ({
  pickDisplay: (display: Display) => dispatch(changeDisplay({ display }))
}))(DisplayPicker);
