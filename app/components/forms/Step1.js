import React, { useState } from "react";

const Step1 = ({ formData, setFormData, nextStep }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.vehicleMake) newErrors.vehicleMake = "Vehicle Make is required.";
    if (!formData.registrationPlate) newErrors.registrationPlate = "Registration Plate is required.";
    if (!formData.carModel) newErrors.carModel = "Car Model is required.";
    if (!formData.manufactureYear) newErrors.manufactureYear = "Manufacture Year is required.";
    if (!formData.vehicleCapacity) newErrors.vehicleCapacity = "Vehicle Capacity is required.";
    if (!formData.fuelType) newErrors.fuelType = "Fuel Type is required.";
    if (!formData.confirmDetails) newErrors.confirmDetails = "You must confirm your details.";

    setErrors(newErrors);

    // Return true if no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      nextStep();
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Step 1: Vehicle Details</h2>
      <form className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Vehicle Make"
            value={formData.vehicleMake}
            onChange={(e) => setFormData({ ...formData, vehicleMake: e.target.value })}
            className="w-full border p-2 rounded"
          />
          {errors.vehicleMake && <p className="text-red-500 text-sm mt-1">{errors.vehicleMake}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Registration Plate"
            value={formData.registrationPlate}
            onChange={(e) => setFormData({ ...formData, registrationPlate: e.target.value })}
            className="w-full border p-2 rounded"
          />
          {errors.registrationPlate && (
            <p className="text-red-500 text-sm mt-1">{errors.registrationPlate}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Car Model"
            value={formData.carModel}
            onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
            className="w-full border p-2 rounded"
          />
          {errors.carModel && <p className="text-red-500 text-sm mt-1">{errors.carModel}</p>}
        </div>

        <div>
          <input
            type="number"
            placeholder="Manufacture Year"
            value={formData.manufactureYear}
            onChange={(e) => setFormData({ ...formData, manufactureYear: e.target.value })}
            className="w-full border p-2 rounded"
          />
          {errors.manufactureYear && (
            <p className="text-red-500 text-sm mt-1">{errors.manufactureYear}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Vehicle Capacity"
            value={formData.vehicleCapacity}
            onChange={(e) => setFormData({ ...formData, vehicleCapacity: e.target.value })}
            className="w-full border p-2 rounded"
          />
          {errors.vehicleCapacity && (
            <p className="text-red-500 text-sm mt-1">{errors.vehicleCapacity}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Fuel Type"
            value={formData.fuelType}
            onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
            className="w-full border p-2 rounded"
          />
          {errors.fuelType && <p className="text-red-500 text-sm mt-1">{errors.fuelType}</p>}
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.confirmDetails}
              onChange={(e) => setFormData({ ...formData, confirmDetails: e.target.checked })}
              className="mr-2"
            />
            Confirm Your Details
          </label>
          {errors.confirmDetails && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmDetails}</p>
          )}
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="bg-slate-400 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default Step1;
