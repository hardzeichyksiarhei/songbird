import { combineReducers } from "redux";
import app from "./app";
import levels from "./levels";

export default combineReducers({
    app,
    levels
});