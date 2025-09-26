import React from "react";
import naturalwax from "../assets/naturalwax.png"
import single1 from "../assets/single-candle1.png"

import single2 from "../assets/single-candle2.png"

import single3 from "../assets/single-candle3.png"


const Features = () => {
  const features = [
    { title: "Therapeutic Scents", img: single1},
    { title: "Eco-Friendly", img: single2 },
    { title: "Wonderfull Designs", img: single3},
  ];

  return (
    <section className="bg-[#F2EAE1] py-12">
      {/* Title */}
      <h2 className="text-center font-heading  text-4xl font-bold  mb-12 ">
        Why Choose Us 
      </h2>

      {/* Four Circles Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-50 h-50 rounded-full  flex items-center justify-center border-3 border-primary overflow-hidden">
              <img src={feature.img} alt={feature.title} className="object-cover" />
            </div>
            <p className="mt-4  font-heading font-bold text-xl text-center">
              {feature.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
