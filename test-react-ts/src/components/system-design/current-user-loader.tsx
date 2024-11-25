import axios from "axios";
import React, { ReactElement } from "react";

import { UserTest } from "../../typing/types";

import { useState, useEffect } from "react";

interface CurrentUserLoaderProps {
  children: ReactElement<{ element: number }>;
  numbers: number[];
}

export const CurrentUserLoader = ({
  children,
  numbers,
}: CurrentUserLoaderProps) => {
  const [user, setUser] = useState({} as UserTest);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:8080/current-user");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    })();
  }, []);

  const cloneElementWithUser = (
    child: ReactElement<{ element: number }>,
    element: number
  ) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        element,
      });
    }
    return child;
  };

  return (
    <>
      {numbers.map((element) =>
        React.Children.map(children, (child) =>
          cloneElementWithUser(child, element)
        )
      )}
    </>
  );
};
