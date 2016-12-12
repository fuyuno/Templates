/// <reference path="../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import {AppContainer as RootContainer} from "react-hot-loader";
import {Provider} from "react-redux";
import AppContainer from "./containers/AppContainer";
import {configureStore} from "./store/configureStore";

const store = configureStore();
const root = document.getElementById("root");
ReactDOM.render(
  <RootContainer>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </RootContainer>,
  root);

if (module.hot) {
  module.hot.accept("./containers/AppContainer", () => {
    // tslint:disable-next-line:no-require-imports
    const NextAppContainer = require("./containers/AppContainer");
    ReactDOM.render(
      <RootContainer>
        <Provider store={store}>
          <NextAppContainer />
        </Provider>
      </RootContainer>,
      root);
  });
}
