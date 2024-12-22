import React, { useState } from "react";

const Step4 = ({ formData, setFormData, prevStep, nextStep }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.issuingCountry) {
      newErrors.issuingCountry = "Issuing country is required.";
    }
    if (!formData.licenseType) {
      newErrors.licenseType = "License type is required.";
    }
    if (!formData.vehicleOwnership) {
      newErrors.vehicleOwnership = "Vehicle ownership is required.";
    }
    if (!formData.drivingLicense) {
      newErrors.drivingLicense = "Driving license is required.";
    }
    if (!formData.insuredAnnually) {
      newErrors.insuredAnnually = "Please specify if the vehicle is insured annually.";
    }
    if (!formData.mobileNumber || formData.mobileNumber.length !== 11) {
      newErrors.mobileNumber = "Mobile number must be exactly 11 digits.";
    }
    if (!formData.email) {
      newErrors.email = "Email address is required.";
    }
    if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = "Email addresses do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      nextStep();
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Step 4: License Details</h2>
      <form className="space-y-6">
        {/* Issuing Country */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Issuing Country <span className="text-red-500">(Required)</span>
          </label>
          <div className="grid grid-cols-4 gap-4 mt-2">
            {["UK", "NI", "EU", "INTL"].map((country) => (
              <label
                key={country}
                className={`py-2 px-4 border rounded-md text-center cursor-pointer ${
                  formData.issuingCountry === country
                    ? "bg-purple-800 text-white"
                    : "bg-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="issuingCountry"
                  value={country}
                  checked={formData.issuingCountry === country}
                  onChange={(e) =>
                    setFormData({ ...formData, issuingCountry: e.target.value })
                  }
                  className="hidden"
                />
                {country}
              </label>
            ))}
          </div>
          {errors.issuingCountry && (
            <p className="text-red-500 text-sm mt-2">{errors.issuingCountry}</p>
          )}
        </div>

        {/* License Type */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            License Type <span className="text-red-500">(Required)</span>
          </label>
          <div className="mt-2 w-full">
            <label
              className={`block py-3 px-4 border rounded-md text-center cursor-pointer w-full ${
                formData.licenseType === "Full License"
                  ? "bg-purple-800 text-white"
                  : "bg-gray-200"
              }`}
            >
              <input
                type="radio"
                name="licenseType"
                value="Full License"
                checked={formData.licenseType === "Full License"}
                onChange={(e) =>
                  setFormData({ ...formData, licenseType: e.target.value })
                }
                className="hidden"
              />
              Full Licence
            </label>
          </div>
          {errors.licenseType && (
            <p className="text-red-500 text-sm mt-2">{errors.licenseType}</p>
          )}
        </div>

        {/* Vehicle Ownership */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Whose vehicle are you learning to drive in?{" "}
            <span className="text-red-500">(Required)</span>
          </label>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {["My Car", "Someone's Else Car"].map((ownership) => (
              <label
                key={ownership}
                className={`py-2 px-4 border rounded-md text-center cursor-pointer ${
                  formData.vehicleOwnership === ownership
                    ? "bg-purple-800 text-white"
                    : "bg-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="vehicleOwnership"
                  value={ownership}
                  checked={formData.vehicleOwnership === ownership}
                  onChange={(e) =>
                    setFormData({ ...formData, vehicleOwnership: e.target.value })
                  }
                  className="hidden"
                />
                {ownership}
              </label>
            ))}
          </div>
          {errors.vehicleOwnership && (
            <p className="text-red-500 text-sm mt-2">{errors.vehicleOwnership}</p>
          )}
        </div>

        {/* Driving License Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Driving License <span className="text-red-500">(Required)</span>
          </label>
          <input
            type="text"
            placeholder="*****-******-*****"
            value={formData.drivingLicense}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/[^A-Za-z0-9]/g, "");
              let maskedValue = "";
              const firstPart = rawValue.slice(0, 5);
              const secondPart = rawValue.slice(5, 11).replace(/[^\d]/g, "");
              const thirdPart = rawValue.slice(11, 16);
              if (firstPart) maskedValue = firstPart;
              if (secondPart) maskedValue += `-${secondPart}`;
              if (thirdPart) maskedValue += `-${thirdPart}`;
              if (maskedValue.length <= 18) {
                setFormData({ ...formData, drivingLicense: maskedValue });
              }
            }}
            className="w-full border p-2 rounded"
          />
          {errors.drivingLicense && (
            <p className="text-red-500 text-sm mt-2">{errors.drivingLicense}</p>
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mobile Number <span className="text-red-500">(Required)</span>
          </label>
          <input
            type="tel"
            placeholder="07XXXXXXXX"
            value={formData.mobileNumber}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/[^0-9]/g, "");
              if (rawValue.length <= 11) {
                setFormData({ ...formData, mobileNumber: rawValue });
              }
            }}
            className="w-full border p-2 rounded"
          />
          {errors.mobileNumber && (
            <p className="text-red-500 text-sm mt-2">{errors.mobileNumber}</p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            What is your email address? <span className="text-red-500">(Required)</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <input
              type="email"
              placeholder="Confirm Email"
              value={formData.confirmEmail || ""}
              onChange={(e) =>
                setFormData({ ...formData, confirmEmail: e.target.value })
              }
              className={`w-full border p-2 rounded ${
                formData.confirmEmail &&
                formData.email !== formData.confirmEmail
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
          </div>
          {errors.confirmEmail && (
            <p className="text-red-500 text-sm mt-2">{errors.confirmEmail}</p>
          )}
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
            onClick={handleNext}
            className="bg-purple-800 text-white py-2 px-4 rounded-md"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step4;
