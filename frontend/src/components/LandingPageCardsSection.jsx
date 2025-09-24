import React from "react";

const LandingPageCardsSection = () => {
  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="heading">
        <h3 className="text-center font-cormorantGaramond  tracking-wider">
          TRENDING
        </h3>
        <h2 className="text-center font-cormorantGaramond font-bold text-3xl tracking-wider">
          Shop our popular candle products{" "}
        </h2>
      </div>

      <div className="cardMain grid grid-cols-4">
        <div className="card1"></div>
      </div>
    </div>
  );
};

export default LandingPageCardsSection;