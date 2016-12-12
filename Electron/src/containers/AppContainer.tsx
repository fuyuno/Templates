/// <reference path="../../typings/index.d.ts" />

import {connect} from "react-redux";
import {App, IAppProps} from "../components/App";
import {RootState} from "../states/RootState";

function mapStateToProps(state: RootState): IAppProps {
  return {

  } as IAppProps;
}

function mapDispatchToProps(dispatch: Function): IAppProps {
  return {

  } as IAppProps;
}

// tslint:disable-next-line:no-default-export
export default connect(mapStateToProps, mapDispatchToProps)(App);
