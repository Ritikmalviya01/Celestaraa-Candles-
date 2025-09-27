import {
  createBrowserRouter,
} from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import SearchCandlesPage from "../Modules/user/SearchCandlesPage";
import Login from "../pages/Login";



const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
{
        path: "/search-candles",
        element: <SearchCandlesPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },

    ]
    }
]
)

export default router;
