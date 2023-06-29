import { useKeycloak } from "@react-keycloak/web";
import { KeycloakTokenParsed } from "keycloak-js";
import { Navigate, Outlet } from "react-router-dom";

interface TokenParsed extends KeycloakTokenParsed {
  name?: string;
  email?: string;
}
const PrivateRoute = () => {
  const { keycloak } = useKeycloak();
  const isLoggedIn = keycloak.authenticated;
  const parsedToken: TokenParsed | undefined = keycloak?.tokenParsed;
  return isLoggedIn && parsedToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
