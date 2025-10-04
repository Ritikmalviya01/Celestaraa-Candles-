import { LuLayoutDashboard } from "react-icons/lu";
// import tesImge from "../../../assets/testimonialsImg.png";
// import userImge from "../../../assets/usertestimonials.png";
// import Icons from "../../../common/Icons";
export const linksAdmin = [
  {
    type: "link",
    name: "Dashboard",
    icon: <LuLayoutDashboard size={22} />,
    path: "/admin",
  },
  {
    type: "dropdown",
    section: "Products",
    path: "/admin/add-products",
    icon: <LuLayoutDashboard size={22} />,
    items: [
      {
        name: "Add Products",
        path: "/admin/add-products",
      },
      {
        name: "View Products",
        path: "/admin/view-products",
      },
    ],
  },
  {
    type: "dropdown",
    section: "Testimonials",
    path: "/admin/add-testimonials",
    icon: <LuLayoutDashboard size={22} />,
    items: [
      {
        name: "Add Testimonials",
        path: "/admin/add-testimonials",
      },
      {
        name: "View Testimonials",
        path: "/admin/view-testimonials",
      },
    ],
  },
  {
    type: "link",
    name: "Listing Management",
    icon: <LuLayoutDashboard size={22} />,
    path: "/admin/listing-management",
  },
  {
    type: "dropdown",
    section: "Sales Team",
    icon: <LuLayoutDashboard size={22} />,
    items: [
      {
        name: "Sales Head",
        path: "/admin/sales-head",
      },
      {
        name: "Sales Executive",
        path: "/admin/sales-executive",
      },
    ],
  },
]