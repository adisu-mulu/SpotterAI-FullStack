import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [currentLocation, setCurrentLocation] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [cycleUsed, setCycleUsed] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ currentLocation, pickupLocation, dropoffLocation, cycleUsed });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Location Input Form</h2>
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
        <div className="mb-3">
          <label htmlFor="currentLocation" className="form-label">Current Location</label>
          <input
            type="number"
            className="form-control"
            id="currentLocation"
            value={currentLocation}
            onChange={(e) => setCurrentLocation(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pickupLocation" className="form-label">Pickup Location</label>
          <input
            type="number"
            className="form-control"
            id="pickupLocation"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dropoffLocation" className="form-label">Dropoff Location</label>
          <input
            type="number"
            className="form-control"
            id="dropoffLocation"
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cycleUsed" className="form-label">Current Cycle Used (Hrs)</label>
          <input
            type="number"
            className="form-control"
            id="cycleUsed"
            value={cycleUsed}
            onChange={(e) => setCycleUsed(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  );
};

export default Home;