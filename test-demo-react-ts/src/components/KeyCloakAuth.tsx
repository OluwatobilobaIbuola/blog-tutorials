import React from "react";
import { useKeycloak } from "@react-keycloak/web";

export const Login = () => {
  const { keycloak } = useKeycloak();
  return (
    <div>
      <button
        onClick={() =>
          keycloak.login({
            redirectUri: "/",
          })
        }
      >
        Login
      </button>
    </div>
  );
};
