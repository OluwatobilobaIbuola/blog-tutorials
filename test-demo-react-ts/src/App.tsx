import "./assets/css/global.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import {
  ControlledFlowComp,
  CurrentUserLoaderComp,
  TypeaheadComp,
  UncontrolledFlowComp,
} from "./components/SystemDesign";
import { Test } from "./components/ClassExample";
import Sticky from "./components/Sticky";
import Drag from "./components/Drag";

function App() {
  const Layout = () => {
    return <Outlet />;
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <div className="flex justify-center items-center min-h-screen">
              <Drag />
            </div>
          ),
        },
        {
          path: "/about-us",
          element: (
            <div className="flex justify-center items-center min-h-screen">
              <div>About Us</div>
            </div>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
