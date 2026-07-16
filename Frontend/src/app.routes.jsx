import { createBrowserRouter} from "react-router-dom";

import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";

const router = createBrowserRouter([

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },{
    path:"/",
    element:<Protected><h1>HomePage</h1></Protected>
  },
  {
  path: "*",
  element: <h1>404 Page Not Found</h1>,
}
]);

export default router;