"use client";
import React, { useState } from "react";
import Step1 from "../components/forms/Step1";
import Step2 from "../components/forms/Step2";
import Step3 from "../components/forms/Step3";
import Step4 from "../components/forms/Step4";
import ConfirmationStep from "../components/forms/ConfirmationStep"; // Import ConfirmationStep
import ProgressBar from "../components/forms/ProgressBar";
import { useRouter } from "next/navigation";
import axios from "axios";

const page = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(""); // Holds server response
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const router = useRouter();

  const [formData, setFormData] = useState({
    // Step 1 Fields
    vehicleMake: "",
    registrationPlate: "",
    carModel: "",
    manufactureYear: "",
    vehicleCapacity: "",
    fuelType: "",
    confirmDetails: false,

    // Step 2 Fields
    reasonForCover: "",
    durationType: "Days", // Default to Days
    selectedDuration: null,
    customDuration: null,
    startDate: null,
    currentTime: null,

    // Step 3 Fields
    title: "",
    firstName: "",
    lastName: "",
    postalCode: "",
    dateOfBirth: "",
    age: "",
    occupation: "",

    // Step 4 Fields
    issuingCountry: "UK",
    licenseType: "Full License",
    vehicleOwnership: "My Car",
    drivingLicense: "",
    insuredAnnually: "Yes",
    mobileNumber: "",
    email: "",
  });

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 5)); // Updated for 5 steps
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top of the page
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top of the page
  };

  const handleSubmit = async () => {
    console.log("Form Submitted:", formData);
    setLoading(true); // Start loading
    setError(null); // Reset error state

    try {
      const response = await axios.post(
        "https://salmon-starling-407425.hostingersite.com/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setData(response.data); // Set server response
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data : "An error occurred.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="max-w-lg mx-auto p-10 my-5 rounded-lg border-2">
      <ProgressBar step={step} />
      {step === 1 && (
        <Step1 formData={formData} setFormData={setFormData} nextStep={nextStep} />
      )}
      {step === 2 && (
        <Step2
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <Step3
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 4 && (
        <Step4
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 5 && (
        <>
          <ConfirmationStep
            formData={formData}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
          />
          {loading && <p>Submitting data, please wait...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {data.file_path && (
            <div className="mt-5">
              <p className="text-green-600">PDF generated successfully!</p>
              <a
                href={data.file_path}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
              >
                Download PDF
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default page;
