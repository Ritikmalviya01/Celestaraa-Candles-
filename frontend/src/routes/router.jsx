import {
  createBrowserRouter,
} from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import SearchCandlesPage from "../Modules/user/pages/SearchCandlesPage";
import Login from "../pages/Login";
import SingleCandleDetails from "../Modules/user/pages/SingleCandleDetails";
import Cart from "../Modules/user/pages/Cart";
import CandleBlog from "../Modules/user/pages/CandleBlog";



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
      {
        path: "/search-candles/:_id",
        element: <SingleCandleDetails />
      },
       {
        path: "/cart",
        element: <Cart/>
      },
      {
        path: "/Blogs",
        element: <CandleBlog />
      }

    ]
    }
]
)

export default router;
