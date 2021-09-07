import React from "react";
import ReactDOM from "react-dom";
import "./styles/globals.scss";
import Desktop from "./components/Desktop";
import { Provider } from "react-redux";
import store from "./state";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Desktop />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
