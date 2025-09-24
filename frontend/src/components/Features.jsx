import React from "react";
import naturalwax from "../assets/naturalwax.png"
import eco from "../assets/eco.png"

import Scentswax from "../assets/Scentswax.png"

import designwax from "../assets/designwax.png"


const Features = () => {
  const features = [
    { title: "Natural Waxes", img: naturalwax },
    { title: "Therapeutic Scents", img: Scentswax},
    { title: "Eco-Friendly", img: eco },
    { title: "Wonderfull Designs", img: designwax},
  ];

  return (
    <section className="bg-[#F2EAE1] py-12">
      {/* Title */}
      <h2 className="text-center text-4xl font-bold text-[#4F382E] mb-12 ">
        Why Choosse Us 
      </h2>

      {/* Four Circles Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-40 h-40 rounded-full bg-[#E3D9CC] flex items-center justify-center shadow-md hover:shadow-lg transition-shadowb overflow-hidden">
              <img src={feature.img} alt={feature.title} className="object-cover" />
            </div>
            <p className="mt-4 text-lg font-medium text-[#4F382E] text-center">
              {feature.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
