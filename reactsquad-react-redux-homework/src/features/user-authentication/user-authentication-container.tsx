"use client";

import { RootState } from "@/redux/store";
import { compose } from "ramda";
import { ConnectedProps, connect } from "react-redux";
import UserAuthenticationComponent from "./user-authentication-component";
import {
  getAuthenticationIsLoading,
  login,
} from "./user-authentication-reducer";

const mapStateToProps = (state: RootState) => ({
  isAuthenticating: getAuthenticationIsLoading(state),
});

const mapDispatchToProps = {
  login,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
export type UserAuthenticationPropsFromRedux = ConnectedProps<typeof connector>;
export const UserAuthenticationContainer = compose(connector)(
  UserAuthenticationComponent
);
