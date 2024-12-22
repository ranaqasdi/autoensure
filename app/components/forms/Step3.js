import React, { useState } from "react";

const Step3 = ({ formData, setFormData, nextStep, prevStep }) => {
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isAddressSelected, setIsAddressSelected] = useState(false);
  const [showAddressInput, setShowAddressInput] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const occupations = [
    "Farmer",
    "Agricultural Scientist",
    "Veterinarian",
    "Fishery Worker",
    "Forester",
    "Conservationist",
    "Horticulturist",
    "Dairy Producer",
    "Rancher",
    "Animal Breeder",
    "Graphic Designer",
    "Photographer",
    "Musician",
    "Actor",
    "Audio Engineer",
    "Film Director",
    "Journalist",
    "Editor",
    "Video Producer",
    "Fashion Designer",
    "Human Resources Specialist",
    "Business Analyst",
    "Office Manager",
    "Entrepreneur",
    "Accountant",
    "Financial Analyst",
    "Operations Manager",
    "Project Manager",
    "Administrative Assistant",
    "Marketing Manager",
    "Teacher",
    "Professor",
    "School Administrator",
    "Instructional Coordinator",
    "Special Education Teacher",
    "Tutor",
    "School Counselor",
    "Librarian",
    "Educational Consultant",
    "Curriculum Developer",
    "Mechanical Engineer",
    "Civil Engineer",
    "Electrical Engineer",
    "Chemical Engineer",
    "Industrial Designer",
    "Aerospace Engineer",
    "Quality Control Specialist",
    "Machinist",
    "Factory Worker",
    "Tool and Die Maker",
    "Banker",
    "Stockbroker",
    "Financial Advisor",
    "Tax Preparer",
    "Actuary",
    "Loan Officer",
    "Investment Analyst",
    "Auditor",
    "Insurance Underwriter",
    "Budget Analyst",
    "Politician",
    "Diplomat",
    "Policy Analyst",
    "Urban Planner",
    "Government Program Manager",
    "Customs Officer",
    "Military Officer",
    "Public Health Official",
    "Tax Inspector",
    "Civil Servant",
    "Doctor",
    "Nurse",
    "Surgeon",
    "Pharmacist",
    "Physiotherapist",
    "Radiologist",
    "Dentist",
    "Optometrist",
    "Psychologist",
    "Nutritionist",
    "Hotel Manager",
    "Chef",
    "Tour Guide",
    "Travel Agent",
    "Bartender",
    "Event Planner",
    "Housekeeper",
    "Concierge",
    "Flight Attendant",
    "Cruise Director",
    "Social Worker",
    "Counselor",
    "Substance Abuse Counselor",
    "Childcare Worker",
    "Marriage and Family Therapist",
    "Funeral Director",
    "Life Coach",
    "Caregiver",
    "Personal Trainer",
    "Software Developer",
    "Systems Administrator",
    "Data Scientist",
    "IT Support Specialist",
    "Web Developer",
    "Cybersecurity Analyst",
    "Network Administrator",
    "Database Administrator",
    "Mobile App Developer",
    "Cloud Architect",
    "Police Officer",
    "Lawyer",
    "Judge",
    "Firefighter",
    "Paralegal",
    "Security Guard",
    "Detective",
    "Corrections Officer",
    "Forensic Scientist",
    "Legal Assistant",
    "Sales Manager",
    "Real Estate Agent",
    "Marketing Analyst",
    "Advertising Executive",
    "Sales Representative",
    "Customer Service Representative",
  ];

  const filteredOccupations = occupations.filter((occupation) =>
    occupation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchAddressSuggestions = () => {
    const postalCode = formData.postalCode;

    if (!postalCode.trim()) {
      alert("Please enter a postal code.");
      return;
    }

    const apiUrl = `https://api.getAddress.io/autocomplete/${encodeURIComponent(
      postalCode
    )}?api-key=MRvbcn_qcUCxmUphXJdP5A44644`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.suggestions && data.suggestions.length > 0) {
          setAddressSuggestions(data.suggestions);
          setShowAddressInput(false);
        } else {
          alert("No address suggestions found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching address suggestions:", error);
        alert("There was an error fetching address suggestions.");
      });
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    setIsAddressSelected(true);
    setFormData({ ...formData, selectedAddress: address });
  };

  const handleEditAddress = () => {
    setSelectedAddress("");
    setIsAddressSelected(false);
    setShowAddressInput(true);
    setAddressSuggestions([]);
  };

  const handleDateChange = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      setErrors({ ...errors, dateOfBirth: "The driver must be at least 18 years old." });
      return;
    }

    setErrors({ ...errors, dateOfBirth: null });
    setFormData({ ...formData, dateOfBirth: dob, age });
  };

  const today = new Date();
  const maxSelectableDate = new Date(today.setFullYear(today.getFullYear() - 18))
    .toISOString()
    .split("T")[0];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.postalCode) newErrors.postalCode = "Postal code is required.";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required.";
    if (!formData.occupation) newErrors.occupation = "Occupation is required.";

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
      <h2 className="text-lg font-bold mb-4">Step 3: Driver Details</h2>
      <form className="space-y-6">
        {/* Title Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            What is the driver's title? <span className="text-red-500">(Required)</span>
          </label>
          <div className="grid grid-cols-4 gap-4 mt-2">
            {["Mr", "Mrs", "Miss", "Ms"].map((title) => (
              <label
                key={title}
                className={`py-2 px-4 border rounded-md text-center cursor-pointer ${
                  formData.title === title ? "bg-purple-800 text-white" : "bg-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="title"
                  value={title}
                  checked={formData.title === title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="hidden"
                />
                {title}
              </label>
            ))}
          </div>
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            What is the driver's full name? <span className="text-red-500">(Required)</span>
          </label>
          <input
            type="text"
            placeholder="FIRST NAME"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full border p-2 rounded"
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name <span className="text-red-500">(Required)</span>
          </label>
          <input
            type="text"
            placeholder="LAST NAME"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full border p-2 rounded"
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>

        {/* Postal Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            What is the driver's home postcode? <span className="text-red-500">(Required)</span>
          </label>
          {showAddressInput && (
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="POSTAL CODE"
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <button
                type="button"
                className="bg-purple-800 text-white px-4 py-2 rounded"
                onClick={fetchAddressSuggestions}
              >
                Find
              </button>
            </div>
          )}
          {!showAddressInput && !isAddressSelected && (
            <div>
              <select
                className="w-full border p-2 rounded"
                onChange={(e) => handleSelectAddress(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  --Select Address--
                </option>
                {addressSuggestions.map((suggestion, index) => (
                  <option key={index} value={suggestion.address}>
                    {suggestion.address}
                  </option>
                ))}
              </select>
            </div>
          )}
          {isAddressSelected && (
            <div className="p-4 gap-8 bg-white flex justify-between items-center rounded shadow-md">
              <div className="flex items-center space-x-4">
                <i className="fa fa-home text-purple-500 text-2xl" aria-hidden="true"></i>
                <p className="font-semibold">{selectedAddress}</p>
              </div>
              <p
                className="text-blue-500 cursor-pointer font-medium"
                onClick={handleEditAddress}
              >
                Edit Address
              </p>
            </div>
          )}
          {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode}</p>}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            What is the driver's date of birth? <span className="text-red-500">(Required)</span>
          </label>
          <input
            type="date"
            value={formData.dateOfBirth}
            max={maxSelectableDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className="w-full border p-2 rounded"
          />
          {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
          {formData.age && (
            <p className="text-sm text-gray-700 mt-2">
              Driver's Age: <strong>{formData.age}</strong>
            </p>
          )}
        </div>

        {/* Occupation */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            What does the driver do for a living? <span className="text-red-500">(Required)</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search or type the driver's occupation"
              value={searchTerm || formData.occupation}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              className="w-full border p-2 rounded"
            />
            {isDropdownOpen && (
              <ul className="absolute z-10 bg-white border rounded shadow-md w-full max-h-48 overflow-y-auto">
                {filteredOccupations.map((occupation, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setFormData({ ...formData, occupation });
                      setSearchTerm(occupation);
                      setIsDropdownOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-slate-400 hover:text-white cursor-pointer"
                  >
                    {occupation}
                  </li>
                ))}
                {filteredOccupations.length === 0 && (
                  <li className="px-4 py-2 text-gray-500">No results found</li>
                )}
              </ul>
            )}
          </div>
          {errors.occupation && <p className="text-red-500 text-sm">{errors.occupation}</p>}
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
            className="bg-slate-400 text-white py-2 px-4 rounded-md"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step3;
