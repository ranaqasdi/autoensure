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
