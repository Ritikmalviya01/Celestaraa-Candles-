import React from "react";
import cardCandleImage from "../assets/candleCardImage.svg";
import { IoMdAddCircle } from "react-icons/io";
import ProductCard from "./ProductCard";

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

const LandingPageCardsSection = () => {
  return (
    <div className="px-6 py-12 bg-bg flex flex-col gap-12">
      <div className="heading">
        <h3 className="text-center text-2xl font-heading  tracking-wider">
          TRENDING
        </h3>
        <h2 className="text-center  font-heading font-bold text-4xl tracking-wider">
          Shop our popular candle products{" "}
        </h2>
      </div>

      <div className="cardMain grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-8">
        {products.map((eachProduct,i) => (
          <ProductCard key={i} eachProduct={eachProduct} />
        ))}
      </div>
    </div>
  );
};

export default LandingPageCardsSection;
