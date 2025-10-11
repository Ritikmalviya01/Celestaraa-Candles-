import React from "react";
import cardCandleImage from "../assets/candleCardImage.svg";
import { IoMdAddCircle } from "react-icons/io";
import axios from "axios";

const ProductCard = ({ eachProduct }) => {

  const handleAddToCart = async () => {
    try {
      // call backend API
      const res = await axios.post(
        "http://localhost:8000/api/user/add-to-cart",
        {
          productId: eachProduct._id,  
          quantity: 1,                 
        },
        { withCredentials: true }       
      );

      if (res.data.success) {
        alert("✅ Added to cart!");
      } else {
        alert("❌ Failed to add to cart");
      }
    } catch (error) {
      console.error("Add to Cart Error:", error.response?.data || error.message);
      alert("⚠️ You must be logged in to add items to cart");
    }
  };

  return (
    <div className="card1 h-fit font-heading  flex flex-col gap-6 grid-cols-1">
      <div className="image w-full">
        <img
          className="w-full h-full object-cover"
          src={eachProduct.images?.[0] || cardCandleImage} // use actual image if available
          alt={eachProduct.name}
        />
      </div>

      <div className="details w-full">
        <div className="nameAndPrice flex w-full justify-between gap-4">
          <span className="name h-16  line-clamp-2 max-sm:text-2xl max-lg:text-2xl md:text-xl lg:text-2xl xl:text-2xl font-bold tracking-wider">
            {eachProduct.name}
          </span>
          <span className="price flex text-green-600 items-start text-2xl font-semibold tracking-wider">
            Rs.{eachProduct.price}
          </span>
        </div>
        <div className="desc text-xl line-clamp-2 tracking-wider h-14 ">
          {eachProduct.description}
        </div>
      </div>

      <div className="addToCardBtn w-full">
        <button
          onClick={handleAddToCart}
          className="w-full py-3 hover:text-white hover:bg-[#4F382E] rounded-full lg:text-base xl:text-xl font-semibold tracking-widest flex gap-4 items-center justify-center border border-[#C9A489]"
        >
          Add to Cart <IoMdAddCircle />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
