"use client";
import { useEffect } from "react";
import type { ConnectedProps } from "react-redux";
import { connect } from "react-redux";
import { loadApp } from "./app-loading-saga";
import Spinner from "@/components/spinner";

const mapDispatchToProps = { loadApp };

const connector = connect(undefined, mapDispatchToProps);

type AppLoadingPropsFromRedux = ConnectedProps<typeof connector>;

function AppLoadingComponent({ loadApp }: AppLoadingPropsFromRedux) {
  useEffect(() => {
    loadApp();
  }, [loadApp]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner />
    </div>
  );
}

export default connector(AppLoadingComponent);
