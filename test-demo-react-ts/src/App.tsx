import "./App.css";
import Debounce from "./components/Debounce";
import GsapComponent from "./components/GsapAnimations";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./config/keycloak";
import PrivateRoute from "./components/PrivateRoute";
import { Login } from "./components/KeyCloakAuth";
import { CheckoutContainer } from "./components/FactoryPatternForIoCReact/CheckoutContainer";
import MyComponent from "./components/NextInputFocus";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import LazyLoadingImage from "./components/LazyLoadingImage";

function App() {
  const Layout = () => {
    return (
      <ReactKeycloakProvider authClient={keycloak}>
        {/* <div>Header</div> */}
        <Outlet />
        {/* <footer>Footer</footer> */}
      </ReactKeycloakProvider>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <LazyLoadingImage />,
        },
        {
          path: "/doo",
          element: (
            <>
              <div>doo</div>
              <Outlet />
            </>
          ),
          children: [{ path: "/doo/doooo", element: <div>doooo</div> }],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
