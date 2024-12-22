"use client";
import React, { useState } from "react";
import Step1 from "../components/forms/Step1";
import Step2 from "../components/forms/Step2";
import Step3 from "../components/forms/Step3";
import Step4 from "../components/forms/Step4";
import ConfirmationStep from "../components/forms/ConfirmationStep"; // Import ConfirmationStep
import ProgressBar from "../components/forms/ProgressBar";
import { useRouter } from "next/navigation";

const page = () => {
  const [step, setStep] = useState(1);
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
  
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const blob = await response.blob(); // Get the PDF blob
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "form-data.pdf";
        a.click(); // Trigger the download
        window.URL.revokeObjectURL(url);
        console.log("PDF downloaded successfully.");
      } else {
        console.error("Failed to generate PDF:", await response);
      }
    } catch (error) {
      console.error("Network error while submitting form:", error);
    }
  };
  
  
  return (
    <div className="max-w-lg mx-auto p-10 my-5 rounded-lg  border-2">
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
        <ConfirmationStep
          formData={formData}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default page;
