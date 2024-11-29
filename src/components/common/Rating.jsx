import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const Rate = () => {
  const [rating, setRating] = useState(0);

  return (
    <div className="flex justify-center items-center min-h-[60vh] text-[60px]">
      {[...Array(5)].map((item, index) => {
        const givenRating = index + 1;
        return (
          <label key={index} className="cursor-pointer">
            <input
              type="radio"
              value={givenRating}
              className="hidden"
              onClick={() => {
                setRating(givenRating);
                alert(`Are you sure you want to give ${givenRating} stars?`);
              }}
            />
            <div>
              <FaStar
                color={givenRating <= rating ? "#000" : "rgb(192,192,192)"}
              />
            </div>
          </label>
        );
      })}
    </div>
  );
};

export default Rate;
