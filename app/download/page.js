"use client";
import React from "react";

const DownloadPage = () => {
  const handleDownloadPDF = async () => {
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "generate-pdf" }), // Example payload
      });

      if (response.ok) {
        const blob = await response.blob(); // Get the PDF blob
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "form-data.pdf";
        a.click(); // Trigger the download
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Failed to download PDF:", await response.text());
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-10 my-5 rounded-lg border-2 text-center">
      <h1 className="text-2xl font-bold mb-4">Thank You!</h1>
      <p className="text-lg mb-6">Your form has been successfully submitted.</p>
      <button
        onClick={handleDownloadPDF}
        className="bg-purple-800 text-white px-4 py-2 rounded-md"
      >
        Download PDF
      </button>
    </div>
  );
};

export default DownloadPage;

  // const htmlContent = `
  // <!DOCTYPE html>
  // <html lang="en">
  // <head>
  //   <meta charset="UTF-8">
  //   <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //   <title>Form Data</title>
  //   <style>
  //     body {
  //     background-color:#f5f5f5;
  //       font-family: Roboto, sans-serif;
  //       margin: 0;
  //       padding: 0;
  //     }
  //     .container {
  //     display: grid;
  //         grid-template-columns: 1fr 1fr; /* Two columns of equal width */
  //         gap: 20px; /* Space between grid items */
  //       width: 90%;
  //       margin: auto;
  //       padding: 20px;
      
  //       border-radius: 8px;
      
  //     }
  //     h1 {
  //       color: #6B21A8;
  //       text-align: center;
  //     }
  //     .field {
  //       margin: 10px 0;
  //     }
  //     .label {
  //       font-weight: 400;
  //       display: inline-block;
        
  //     }
  //     .value {
  //     text-decoration: underline;
  //     font-weight:600;
  //       color: #333;
  //       margin-left: 10px;
  //     }
  //     .footer {
  //       text-align: center;
  //       margin-top: 20px;
  //       font-size: 12px;
  //       color: #6B21A8;
  //     }
  //   </style>
  // </head>
  // <body>
  // <h1>Form Submission Details</h1>
  //   <div class="container">
  //     <div class="field"><span class="label">Vehicle Make:</span> <span class="value">${data.vehicleMake || "N/A"}</span></div>
  //     <div class="field"><span class="label">Registration Plate:</span> <span class="value">${data.registrationPlate || "N/A"}</span></div>
  //     <div class="field"><span class="label">Car Model:</span> <span class="value">${data.carModel || "N/A"}</span></div>
  //     <div class="field"><span class="label">Manufacture Year:</span> <span class="value">${data.manufactureYear || "N/A"}</span></div>
  //     <div class="field"><span class="label">Vehicle Capacity:</span> <span class="value">${data.vehicleCapacity || "N/A"}</span></div>
  //     <div class="field"><span class="label">Fuel Type:</span> <span class="value">${data.fuelType || "N/A"}</span></div>
  //     <div class="field"><span class="label">Reason for Cover:</span> <span class="value">${data.reasonForCover || "N/A"}</span></div>
  //     <div class="field"><span class="label">Duration Type:</span> <span class="value">${data.durationType || "N/A"}</span></div>
  //     <div class="field"><span class="label">Duration:</span> <span class="value">${data.selectedDuration || "N/A"}</span></div>
  //     <div class="field"><span class="label">Start Date:</span> <span class="value">${data.startDate || "N/A"}</span></div>
  //     <div class="field"><span class="label">Current Time:</span> <span class="value">${data.currentTime || "N/A"}</span></div>
  //     <div class="field"><span class="label">Title:</span> <span class="value">${data.title || "N/A"}</span></div>
  //     <div class="field"><span class="label">First Name:</span> <span class="value">${data.firstName || "N/A"}</span></div>
  //     <div class="field"><span class="label">Last Name:</span> <span class="value">${data.lastName || "N/A"}</span></div>
  //     <div class="field"><span class="label">Postal Code:</span> <span class="value">${data.postalCode || "N/A"}</span></div>
  //     <div class="field"><span class="label">Date of Birth:</span> <span class="value">${data.dateOfBirth || "N/A"}</span></div>
  //     <div class="field"><span class="label">Age:</span> <span class="value">${data.age || "N/A"}</span></div>
  //     <div class="field"><span class="label">Occupation:</span> <span class="value">${data.occupation || "N/A"}</span></div>
  //     <div class="field"><span class="label">Issuing Country:</span> <span class="value">${data.issuingCountry || "N/A"}</span></div>
  //     <div class="field"><span class="label">License Type:</span> <span class="value">${data.licenseType || "N/A"}</span></div>
  //     <div class="field"><span class="label">Vehicle Ownership:</span> <span class="value">${data.vehicleOwnership || "N/A"}</span></div>
  //     <div class="field"><span class="label">Driving License:</span> <span class="value">${data.drivingLicense || "N/A"}</span></div>
  //     <div class="field"><span class="label">Mobile Number:</span> <span class="value">${data.mobileNumber || "N/A"}</span></div>
  //     <div class="field"><span class="label">Email:</span> <span class="value">${data.email || "N/A"}</span></div>
    
  //   </div> <div class="footer">Generated by Our ToolsByQasid</div>
  // </body>
  // </html>
  // `;