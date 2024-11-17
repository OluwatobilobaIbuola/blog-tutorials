"use client";
import { curry } from "ramda";
import { connect } from "react-redux";

import RequiresPermission from "./requires-permission-component";
import { RootState } from "@/redux/store";

function requiresPermission(
  NotPermittedComponent: React.ComponentType,
  selector: (state: RootState) => boolean,
  PermittedComponent: React.ComponentType
) {
  const mapStateToProps = (state: RootState) => ({
    NotPermittedComponent,
    PermittedComponent,
    isPermitted: selector(state),
  });

  return connect(mapStateToProps)(RequiresPermission);
}

export default curry(requiresPermission);
