import React, { useState } from "react";
import { createTrip } from "../services/api";
import './TripForm.css';
const TripForm = ({ setTripData }) => {
  const [formData, setFormData] = useState({
    current_location_latitude: "",
    current_location_longitude: "",
    pickup_location_latitude: "",
    pickup_location_longitude: "",
    dropoff_location_latitude: "",
    dropoff_location_longitude: "",
    current_cycle_hours: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      current_location_latitude,
      current_location_longitude,
      pickup_location_latitude,
      pickup_location_longitude,
      dropoff_location_latitude,
      dropoff_location_longitude,
      current_cycle_hours,
    } = formData;

    // Prepare the data to send to the backend
    const tripData = {
      current_location: [
        parseFloat(current_location_latitude),
        parseFloat(current_location_longitude),
      ],
      pickup_location: [
        parseFloat(pickup_location_latitude),
        parseFloat(pickup_location_longitude),
      ],
      dropoff_location: [
        parseFloat(dropoff_location_latitude),
        parseFloat(dropoff_location_longitude),
      ],
      current_cycle_hours: parseFloat(current_cycle_hours),
    };

    console.log(tripData); // For debugging purposes, log the tripData
    createTrip(tripData)
      .then((data) => {
        if (data) {
          console.log("Trip created successfully:", data);
          setTripData(data); 
          // Handle the response here (e.g., show success message)
        }
      })
      .catch((error) => {
        console.error("Failed to create trip:", error);
        // Handle error response here
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="trip-form">
        <h2>Create a Trip</h2>

        {/* Current Location */}
        <div className="input-group">
          <label>Current Location</label>
          <div className="coordinate-inputs">
            <input
              type="number"
              name="current_location_latitude"
              placeholder="Latitude"
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="current_location_longitude"
              placeholder="Longitude"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Pickup Location */}
        <div className="input-group">
          <label>Pickup Location</label>
          <div className="coordinate-inputs">
            <input
              type="number"
              name="pickup_location_latitude"
              placeholder="Latitude"
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="pickup_location_longitude"
              placeholder="Longitude"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Dropoff Location */}
        <div className="input-group">
          <label>Dropoff Location</label>
          <div className="coordinate-inputs">
            <input
              type="number"
              name="dropoff_location_latitude"
              placeholder="Latitude"
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="dropoff_location_longitude"
              placeholder="Longitude"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Hours Used */}
        <div className="input-group">
          <label>Hours Used</label>
          <input
            type="number"
            name="current_cycle_hours"
            placeholder="Hours Used"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Generate Trip</button>
      </form>
    </div>
  );
};

export default TripForm;
