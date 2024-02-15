import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './Rating.css';
import data from '../data/TemplateData.json';

const Rating = ({ eachRestaurant, initialRating }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  const [rated, setRated] = useState(false);
  const [clicked, setClicked] = useState(false);
  const PORT = process.env.PORT || 4002;

  const handleRatingChange = (newRating) => {
    if (!rated && !clicked) {
      const newAverageRating = calculateNewAverageRating(
        eachRestaurant.id,
        newRating,
      );
      setRating(newAverageRating);
      updateJsonData(eachRestaurant, newAverageRating);
      setRated(true);
      setClicked(true);
    }
  };

  const calculateNewAverageRating = (restaurantId, newRating) => {
    const restaurant = data.find(
      (restaurant) => restaurant.id === restaurantId,
    );
    return (parseFloat(restaurant.currentRating) + newRating) / 2;
  };

  const updateJsonData = (eachRestaurant, newRating) => {
    const updatedData = data.map((restaurant) => {
      if (restaurant.id === eachRestaurant.id) {
        return { ...restaurant, currentRating: newRating.toFixed(2) };
      }
      return restaurant;
    });
    fetch(`http://localhost:${PORT}/updateData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update data');
        }
        console.log('Data updated successfully');
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  return (
    <>
      <div className="star-container">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <label key={index}>
              <input
                className="stars"
                type="radio"
                name={`rating-${eachRestaurant.id}`}
                value={ratingValue}
                style={{ display: 'none' }}
                disabled={rated || clicked}
              />
              <FaStar
                className="star"
                color={
                  (clicked && ratingValue <= rating) ||
                  (!clicked && ratingValue <= (hover || ratingValue))
                    ? '#ffc107'
                    : '#e4e5e9'
                }
                size={20}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
                onClick={() => handleRatingChange(ratingValue)}
              />
            </label>
          );
        })}
      </div>
      <p>{rating}</p>
    </>
  );
};

export default Rating;
