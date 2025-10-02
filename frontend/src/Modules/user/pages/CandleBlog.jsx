import { useState } from 'react';

export default function CandleBlog() {
  const featuredPost = {
    category: 'PRODUCT',
    title: 'Choosing the right candle with the atmosphere',
    description: 'Light the candle, using a long match or a lighter, and let it burn for a few hours to allow the wax to melt and the fragrance to be released into the air. Make sure to never leave a lit',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&q=80'
  };

  const blogPosts = [
    {
      id: 1,
      category: 'PRODUCT',
      title: 'Decorate the room with scented candles',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&q=80'
    },
    {
      id: 2,
      category: 'PRODUCT',
      title: 'Light scented candles in the bathroom',
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&q=80'
    },
    {
      id: 3,
      category: 'PRODUCT',
      title: 'Study accompanied by a scented candle',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&q=80'
    },
    {
      id: 4,
      category: 'PRODUCT',
      title: 'Scented candles are the best gifts',
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&q=80'
    },
    {
      id: 5,
      category: 'PRODUCT',
      title: 'Rechange your former candle holder here',
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&q=80'
    },
    {
      id: 6,
      category: 'PRODUCT',
      title: 'Consider harmful ingredients saidtobeby',
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&q=80'
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="bg-bg">
      {/* Featured Post */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="space-y-4">
            <p className="text-xs font-medium text-gray-500 tracking-wider uppercase">
              {featuredPost.category}
            </p>
            <h1 className="text-3xl md:text-4xl font-medium text-gray-900 leading-tight">
              {featuredPost.title}
            </h1>
            <p className="text-gray-600 leading-relaxed text-sm">
              {featuredPost.description}
            </p>
          </div>
        </div>

        {/* Blue Divider Line */}
        <div className="h-0.5 bg-blue-500 mb-12"></div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="group cursor-pointer">
              <div className="mb-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-500 tracking-wider uppercase">
                  {post.category}
                </p>
                <h3 className="text-lg font-medium text-gray-900 leading-snug">
                  {post.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {/* <div className="flex items-center justify-center gap-2 mt-12">
          <button className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-medium">
            {currentPage}
          </button>
          <button
            onClick={() => setCurrentPage(2)}
            className="w-8 h-8 rounded-full bg-white border border-gray-300 text-gray-700 flex items-center justify-center text-sm font-medium"
          >
            2
          </button>
          <button
            onClick={() => setCurrentPage(3)}
            className="w-8 h-8 rounded-full bg-white border border-gray-300 text-gray-700 flex items-center justify-center text-sm font-medium"
          >
            3
          </button>
          <button className="w-8 h-8 rounded-full bg-white border border-gray-300 text-gray-700 flex items-center justify-center">
            →
          </button>
        </div> */}
      </div>
    </div>
  );
}