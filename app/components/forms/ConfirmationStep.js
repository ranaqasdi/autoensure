import React from "react";

const ConfirmationStep = ({ formData, prevStep, handleSubmit }) => {

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Step 4: Confirm Details</h2>
      <div className="space-y-6 border p-4 rounded-md bg-gray-50">
        {/* Vehicle Details */}
        <div>
          <h3 className="text-md font-semibold mb-2">Vehicle Details</h3>
          <p><strong>Make:</strong> {formData.vehicleMake || "N/A"}</p>
          <p><strong>Registration Plate:</strong> {formData.registrationPlate || "N/A"}</p>
          <p><strong>Car Model:</strong> {formData.carModel || "N/A"}</p>
          <p><strong>Manufacture Year:</strong> {formData.manufactureYear || "N/A"}</p>
          <p><strong>Vehicle Capacity:</strong> {formData.vehicleCapacity || "N/A"}</p>
          <p><strong>Fuel Type:</strong> {formData.fuelType || "N/A"}</p>
        </div>

        {/* Coverage Details */}
        <div>
          <h3 className="text-md font-semibold mb-2">Coverage Details</h3>
          <p><strong>Reason for Cover:</strong> {formData.reasonForCover || "N/A"}</p>
          <p><strong>Duration Type:</strong> {formData.durationType || "N/A"}</p>
          <p>
            <strong>Cover Duration:</strong> 
            {formData.selectedDuration === "Other"
              ? `${formData.customDuration || "N/A"} ${formData.durationType}`
              : `${formData.selectedDuration || "N/A"} ${formData.durationType}`}
          </p>
          <p><strong>Start Date:</strong> {formData.startDate || "N/A"}</p>
          <p><strong>Start Date:</strong> {formData.currentTime || "N/A"}</p>
          
        </div>

        {/* Driver Details */}
        <div>
          <h3 className="text-md font-semibold mb-2">Driver Details</h3>
          <p><strong>Title:</strong> {formData.title || "N/A"}</p>
          <p><strong>Full Name:</strong> {formData.firstName || "N/A"} {formData.lastName || "N/A"}</p>
          <p><strong>Date of Birth:</strong> {formData.dateOfBirth || "N/A"}</p>
          <p><strong>Age:</strong> {formData.age || "N/A"}</p>
          <p><strong>Occupation:</strong> {formData.occupation || "N/A"}</p>
          <p><strong>Home Address:</strong> {formData.selectedAddress || formData.postalCode || "N/A"}</p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="bg-gray-500 text-white py-2 px-4 rounded-md"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-green-600 text-white py-2 px-4 rounded-md"
          >
            Confirm and Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationStep;
