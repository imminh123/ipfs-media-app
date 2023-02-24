import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Home />,
  },
  {
    path: "/",
    element: <Dashboard />,
  },
]);
