import "./assets/css/global.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

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
              Home
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
