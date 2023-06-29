import "./App.css";
import Debounce from "./components/Debounce";
import GsapComponent from "./components/GsapAnimations";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./config/keycloak";
import PrivateRoute from "./components/PrivateRoute";
import { Login } from "./components/KeyCloakAuth";
import { CheckoutContainer } from "./components/FactoryPatternForIoCReact/CheckoutContainer";

function App() {
  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/factory-pattern" element={<CheckoutContainer />} />
            <Route path="/gsap" element={<GsapComponent />} />
            <Route element={<PrivateRoute />}>
              <Route path="/debounce" element={<Debounce />} />
            </Route>
            {/* <TextInputWithFocusButton /> */}
            {/* <SearchCustomer /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </ReactKeycloakProvider>
  );
}

export default App;
