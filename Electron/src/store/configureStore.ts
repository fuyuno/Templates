/// <reference path="../../typings/index.d.ts" />

import {applyMiddleware, createStore} from "redux";
import * as createLogger from "redux-logger";
import * as thunkMiddleware from "redux-thunk";
import * as reducers from "../reducers";

const loggerMiddleware: Redux.Middleware = createLogger();

export function configureStore(): Redux.Store<{}> {
  let store = createStore(reducers.rootReducer, {}, applyMiddleware(thunkMiddleware.default, loggerMiddleware));
  if (module.hot) {
    module.hot.accept("../reducers", () => {
      // tslint:disable-next-line:no-require-imports
      const nextRootreducer = require("../reducers").rootReducer;
      store.replaceReducer(nextRootreducer);
    });
  }
  return store;
}
