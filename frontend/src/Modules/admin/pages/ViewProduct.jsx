


import React, { useEffect, useState } from "react";
import cardCandleImage from "../../../assets/candleCardImage.svg";
import { IoMdAddCircle } from "react-icons/io";
import axios from "axios" 
import ProductCard from "../../../components/ProductCard";

const products = [
  {
    name: "Vanilla Relax",
    price: 20,
    oldPrice: 24,
    desc: "Cake Smell",
    discount: "17%", // ((24-20)/24 * 100)
  },
  {
    name: "Beach Sunshine",
    price: 40,
    oldPrice: 44,
    desc: "Enjoy the afternoon",
    discount: "9%", // ((44-40)/44 * 100)
  },
  {
    name: "Brown Relac",
    price: 33,
    oldPrice: 37,
    desc: "Together in the afternoon",
    discount: "11%", // ((37-33)/37 * 100)
  },
  {
    name: "Moon Morning",
    price: 34,
    oldPrice: 38,
    desc: "The scent of the morning",
    discount: "11%", // ((38-34)/38 * 100)
  },
];

const ViewProduct = () => {
const [prductDetails , setProductDetails] = useState([])

useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/admin/products",
          {withCredentials: true,}
         );
        setProductDetails(response.data?.products); 
        console.log(response.data)// use response.data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts(); // call the async function
  }, []); 

  return (
    <div className="px-6 py-12 bg-bg flex flex-col gap-12">
      <div className="heading">
        <h3 className="text-center text-4xl font-heading  tracking-wider">
          LISTED PRODUCTS
        </h3>
      
      </div>

      <div className="cardMain grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-8">
        {prductDetails.map((eachProduct,i) => (
          <ProductCard key={i} eachProduct={eachProduct} />
        ))}
      </div>
    </div>
  );
};

export default ViewProduct;
