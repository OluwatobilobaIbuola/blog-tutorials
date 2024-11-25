"use client";

import { PropsWithChildren, useEffect } from "react";
import type { ConnectedProps } from "react-redux";
import { connect } from "react-redux";

import { RootState } from "@/redux/store";
import { useToast } from "@/components/ui/use-toast";
import {
  getShowErrorToast,
  getShowSuccessToast,
  handleResetToast,
} from "@/features/app-loading/app-loading-reducer";
import useSetTimeout from "@/hooks/useSetTimeout";

type Toast = {
  showToast: boolean;
  message: string;
  title: string;
};

export default function <T>(
  Component: React.ComponentType<
    Omit<T, "successToast" | "errorToast" | "handleResetToast">
  >
) {
  const mapStateToProps = (
    state: RootState
  ): { successToast: Toast; errorToast: Toast } & Record<string, any> => ({
    successToast: getShowSuccessToast(state),
    errorToast: getShowErrorToast(state),
  });
  const mapDispatchToProps = {
    handleResetToast: handleResetToast,
  };
  const connector = connect(mapStateToProps, mapDispatchToProps);
  function WithToast({
    successToast,
    errorToast,
    handleResetToast,
    ...props
  }: PropsWithChildren<T & ConnectedProps<typeof connector>>): JSX.Element {
    const { toast: toastHandler } = useToast();
    useEffect(() => {
      if (successToast.showToast) {
        toastHandler({
          title: successToast.title,
          description: successToast.message,
        });
      }
    }, [successToast.showToast]);
    useEffect(() => {
      if (errorToast.showToast) {
        toastHandler({
          title: errorToast.title,
          description: errorToast.message,
        });
      }
    }, [errorToast.showToast]);

    useSetTimeout(() => handleResetToast(), 1000, [successToast.showToast]);
    useSetTimeout(() => handleResetToast(), 1000, [errorToast.showToast]);

    return <Component {...props} />;
  }

  return connector(WithToast);
}
