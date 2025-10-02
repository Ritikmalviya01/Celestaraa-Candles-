import React from 'react'
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import candleImg from "../../../assets/candleCardImage.svg"
import LandingPageCardsSection from '../../../components/LandingPageCardsSection';

const SingleCandleDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };
  return (
    <div>
        <div className=" bg-bg p-6 md:p-6">
      <div className="">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <img
              src={candleImg}
              alt="Vanilla Relax Candle"
              className="w-full sm:h-[545px] rounded-lg shadow-lg object-cover"
            />
          </div>

          {/* Product Details Section */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-4">
              {/* Title and Price */}
              <div className="flex justify-between items-start">
                <h1 className="text-4xl font-serif text-gray-900">
                  Vanilla Relax Candle
                </h1>
                <div className="text-right">
                  <span className="text-3xl font-semibold text-gray-900">$20</span>
                  <span className="text-xl text-gray-400 line-through ml-2">$24</span>
                </div>
              </div>

              {/* Reviews */}
              <div className="flex items-center gap-2">
                <div className="flex text-amber-600">
                  {/* {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))} */}
                </div>
                <span className="text-gray-600">12 reviews</span>
              </div>

              {/* Subtitle */}
              <p className="text-gray-600 text-lg">Like the scent of the mountains</p>

              {/* Quantity and Add to Cart */}
              <div className="flex gap-4 mt-6">
                <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="mx-6 text-lg font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <button className="flex-1 bg-primary text-white hover:text-black hover:border border-primary rounded-full py-3 px-8 font-medium hover:bg-white transition">
                  ADD TO CART
                </button>
              </div>

              {/* Accordion Sections */}
              <div className="mt-8 space-y-4">
                {/* Description */}
                <div className="border-b border-gray-300">
                  <button
                    onClick={() => toggleSection('description')}
                    className="w-full flex justify-between items-center py-4 text-left"
                  >
                    <span className="text-xl font-medium text-gray-900">Description</span>
                    <Plus className={`transform transition-transform ${openSection === 'description' ? 'rotate-45' : ''}`} />
                  </button>
                  {openSection === 'description' && (
                    <div className="pb-4 text-gray-600">
                      <p>Experience the calming essence of vanilla with our handcrafted Relax Candle. Perfect for creating a serene atmosphere in any room.</p>
                    </div>
                  )}
                </div>

                {/* Ingredients */}
                <div className="border-b border-gray-300">
                  <button
                    onClick={() => toggleSection('ingredients')}
                    className="w-full flex justify-between items-center py-4 text-left"
                  >
                    <span className="text-xl font-medium text-gray-900">Ingredients</span>
                    <Plus className={`transform transition-transform ${openSection === 'ingredients' ? 'rotate-45' : ''}`} />
                  </button>
                  {openSection === 'ingredients' && (
                    <div className="pb-4 text-gray-600">
                      <p>Natural soy wax, vanilla essential oil, cotton wick, and eco-friendly fragrance blend.</p>
                    </div>
                  )}
                </div>

                {/* How To Use */}
                <div className="border-b border-gray-300">
                  <button
                    onClick={() => toggleSection('howto')}
                    className="w-full flex justify-between items-center py-4 text-left"
                  >
                    <span className="text-xl font-medium text-gray-900">How To Use?</span>
                    <Plus className={`transform transition-transform ${openSection === 'howto' ? 'rotate-45' : ''}`} />
                  </button>
                  {openSection === 'howto' && (
                    <div className="pb-4 text-gray-600">
                      <p>Light the wick and let burn for 2-3 hours on first use. Trim wick to 1/4 inch before each use for optimal performance.</p>
                    </div>
                  )}
                </div>

                {/* How To Feel */}
                <div className="border-b border-gray-300">
                  <button
                    onClick={() => toggleSection('howtofeel')}
                    className="w-full flex justify-between items-center py-4 text-left"
                  >
                    <span className="text-xl font-medium text-gray-900">How To Feel?</span>
                    <Plus className={`transform transition-transform ${openSection === 'howtofeel' ? 'rotate-45' : ''}`} />
                  </button>
                  {openSection === 'howtofeel' && (
                    <div className="pb-4 text-gray-600">
                      <p>You are like being under a pine tree at the foot of the hill. The smell of earth mixed with rain will cool you.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='similar-cards'>
   <LandingPageCardsSection />
    </div>
    </div>
  );
}
export default SingleCandleDetails;