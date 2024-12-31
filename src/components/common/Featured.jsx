import React, { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import featured1 from "../../assets/featured_1.jpg"
import featured2 from "../../assets/featured_2.jpg"
import featured3 from "../../assets/featured_3.jpg"

const Featured = () => {
  const sliders = [
    {
      url: featured1,
    },
    {
      url: featured2,
    },
    {
      url: featured3,
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlider = () => {
    const newIndex = currentIndex === 0 ? sliders.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlider = () => {
    const newIndex = currentIndex === sliders.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Automatically change the slide after 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = currentIndex === sliders.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    }, 3000); 

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [currentIndex, sliders.length]);

  return (
    <div className='max-w-[1520px] h-[600px] w-full mt-[63px] px-4 relative group'>
      <div
        className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
        style={{ backgroundImage: `url(${sliders[currentIndex].url})` }}
      ></div>
      {/* Left Cursor */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black text-white cursor-pointer'>
        <BsChevronCompactLeft onClick={prevSlider} />
      </div>
      {/* Right Cursor */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black text-white cursor-pointer'>
        <BsChevronCompactRight onClick={nextSlider} />
      </div>
      {/* Removed Dots Section */}
    </div>
  );
};

export default Featured;
