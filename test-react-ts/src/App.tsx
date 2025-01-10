import { useEffect, useState } from "react";
import "./assets/css/global.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

function App() {
  console.log("App");
  const [email, setEmail] = useState("");
  const [useStateVar, setUseStateVar] = useState(false);
  useEffect(() => {
    console.log("useEffect");
    console.log("useStateVar", useStateVar);
    const testUseState = () => {
      console.log("testUseState");
      console.log(
        "useStateVar in testUseState before setUseStateVar",
        useStateVar
      );
      setUseStateVar(true);
      console.log(
        "useStateVar in testUseState after setUseStateVar",
        useStateVar
      );
    };

    testUseState();
  }, [email]);

  console.log("App, render");

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
            <div className="flex justify-center flex-col items-center min-h-screen">
              <p>Home</p>

              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
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
