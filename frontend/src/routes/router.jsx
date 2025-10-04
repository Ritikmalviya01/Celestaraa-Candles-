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
import Signup from "../pages/SignUp";
import AdminDashHome from "../Modules/admin/pages/AdminDashHome";
import DashBoard from "../Modules/admin/pages/DashBoard";
import AdminSideBar from "../layout/AdminSideBar";
import AddTestimonials from "../Modules/admin/pages/AddTestimonials";
import ViewTestimonials from "../Modules/admin/pages/ViewTestimonials";
import AddProduct from "../Modules/admin/pages/AddProduct";
import ViewProduct from "../Modules/admin/pages/ViewProduct";



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
        path: "/signup",
        element: <Signup />,
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
,
      {
        path:"/admin",
        element:<AdminSideBar/>,
        children:[
          {
            index:true,
            element:<DashBoard/>
          },
          {
            path:"add-testimonials",
            element:<AddTestimonials/>
          },
           {
            path:"view-testimonials",
            element:<ViewTestimonials/>
          },
          {
            path:"add-products",
            element:<AddProduct/>
          },
           {
            path:"view-products",
            element:<ViewProduct/>
          }
        ]
      }

    ]
    }
]
)

export default router;
