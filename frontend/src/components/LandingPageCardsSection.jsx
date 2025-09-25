import React from "react";
import cardCandleImage from "../assets/candleCardImage.svg";
import { IoMdAddCircle } from "react-icons/io";

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
    <div className="px-6 py-12 flex flex-col gap-12">
      <div className="heading">
        <h3 className="text-center text-2xl font-heading  tracking-wider">
          TRENDING
        </h3>
        <h2 className="text-center  font-heading font-bold text-4xl tracking-wider">
          Shop our popular candle products{" "}
        </h2>
      </div>

      <div className="cardMain grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-8">
        {products.map((eachProduct, i) => (
          <div className="card1 font-heading flex flex-col gap-6 grid-cols-1">
            <div className="image w-full">
              <img
                className="w-full h-full object-cover"
                src={cardCandleImage}
                alt="cardCandleImage"
              />
            </div>

            <div className="details w-full">
              <div className="nameAndPrice flex w-full justify-between">
                <span className="name max-sm:text-2xl max-lg:text-2xl md:text-xl lg:text-2xl xl:text-3xl  font-bold tracking-wider">
                 {eachProduct.name}
                </span>
                <span className="price flex items-start text-3xl font-semibold tracking-wider">
                  ${eachProduct.price}{" "}
                  <span className="line-through text-xl text-[#9E9EA0]">
                     ${eachProduct.oldPrice}
                  </span>
                </span>
              </div>
              <div className="desc text-xl tracking-wider h-6 truncate"> {eachProduct.desc}</div>
            </div>

            <div className="addToCardBtn w-full">
              <button className="w-full py-3 hover:text-white hover:bg-[#4F382E] rounded-full lg:text-base xl:text-xl font-semibold tracking-widest flex gap-4 items-center justify-center border border-[#C9A489]">
                Add to Cart <IoMdAddCircle />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPageCardsSection;
