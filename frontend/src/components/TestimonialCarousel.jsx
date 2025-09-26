import React, { useState, useEffect } from 'react';
import arrow from "../assets/arrowTestimonial.png"
const TestimonialCarousel = () => {
  const testimonials = [
    {
      id: 1,
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      name: "Ritesh",
      title: "Creative Director",
      location: "New York",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      text: "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, making it look like readable English.",
      name: "Rohan ",
      title: "Product Manager",
      location: "San Francisco",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
      name: "Ritik",
      title: "UX Designer",
      location: "Ritik",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 4, 
      text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature.",
      name: "Rupesh",
      title: "Frontend Developer",
      location: "Seattle",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); 

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  

  return (
   <>
   <h1 className='flex justify-center font-bold font-heading text-4xl'>Testimonial</h1>
    <div className="w-full   flex items-center">
    
      <div className="w-full    rounded-xl sm:rounded-2xl  p-6 sm:p-8 lg:p-12 relative overflow-hidden">
        {/* Testimonials Container */}
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="w-full h- flex-shrink-0 text-center px-4 sm:px-8">
              {/* Quote Icon */}
              <div className="mb-6 sm:mb-8">
                <svg 
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-primary mx-auto opacity-60" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>

              {/* Testimonial Text */}
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 font-heading font-bold  leading-relaxed max-w-3xl mx-auto px-2">
                {testimonial.text}
              </p>

              {/* Arrow Line */}
              <div className="mb-4 flex justify-center ">
               <img src={arrow} alt="" className='' />
              </div>

              {/* Avatar */}
              <div className="mb-4 sm:mb-6">
                <img 
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full mx-auto border-3 sm:border-4 border-primary/70 s"
                />
              </div>

              {/* Name and Title */}
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold font-heading text-black mb-1">
                  {testimonial.name}
                </h3>
                <p className="text-sm sm:text-base font-semibold font-heading text-gray-600">
                  {testimonial.title}, {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>

      

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-200 ${
                index === currentIndex 
                  ? 'bg-teal-500' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
    </>
  );
  
};

export default TestimonialCarousel;