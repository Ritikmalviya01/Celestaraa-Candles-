import React from "react";
import aboutImage from "../assets/baner1.png"; // 🕯️ use your own image here

const About = () => {
  return (
    <div className="bg-bg text-gray-800 px-6 py-16 md:px-20 lg:px-32 flex flex-col gap-16">
      
      {/* 🕯️ Section 1 - Intro */}
      <section className="text-center flex flex-col gap-4">
        <h3 className="text-2xl font-heading tracking-wider text-primary">
          ABOUT US
        </h3>
        <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-wider">
          The Art of Scented Serenity
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
          At <span className="font-semibold text-primary">GlowAura Candles</span>,
          we craft more than just candles — we create experiences. Every fragrance 
          is handpicked to evoke peace, joy, and nostalgia, turning ordinary spaces 
          into soothing sanctuaries.
        </p>
      </section>

      {/* 🕯️ Section 2 - Image + Story */}
      <section className="flex flex-col lg:flex-row items-center gap-12">
        <img
          src={aboutImage}
          alt="Candle Making"
          className="w-full lg:w-1/2 rounded-2xl shadow-lg"
        />
        <div className="flex flex-col gap-4 lg:w-1/2">
          <h2 className="text-3xl font-heading font-bold tracking-wider">
            Our Story
          </h2>
          <p className="text-gray-600 leading-relaxed">
            It all began with a passion for warmth and comfort. What started as 
            a small kitchen experiment with wax and wicks soon became a brand 
            dedicated to mindfulness and relaxation.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Each candle is carefully poured with natural soy wax and infused 
            with unique fragrances designed to calm the soul and inspire 
            creativity.
          </p>
        </div>
      </section>

      {/* 🕯️ Section 3 - Values */}
      <section className="text-center flex flex-col gap-8">
        <h2 className="text-3xl font-heading font-bold tracking-wider">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Sustainability",
              desc: "Eco-friendly materials and recyclable packaging in every product we craft.",
            },
            {
              title: "Craftsmanship",
              desc: "Hand-poured with love, care, and a passion for aromatic perfection.",
            },
            {
              title: "Community",
              desc: "Supporting local artisans and creating candles that bring people together.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/70 shadow-md rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-primary mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🕯️ Section 4 - CTA */}
      <section className="text-center  bg-primary text-white rounded-2xl py-12 px-6 flex flex-col items-center gap-4">
        <h2 className="text-3xl font-heading font-bold tracking-wider">
          Light Up Your Mood Today
        </h2>
        <p className="max-w-2xl mx-auto text-white/90">
          Discover the perfect scent that matches your vibe and transforms your
          space into a cozy retreat.
        </p>
        <a
          href="/search-candles"
          className="mt-4 w-fit  inline-block bg-white text-primary font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition duration-300"
        >
          Explore Collection
        </a>
      </section>
    </div>
  );
};

export default About;

