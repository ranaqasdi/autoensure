"use client";
import { useState, useEffect } from "react";

const Step2 = ({ formData, setFormData, nextStep, prevStep }) => {
  const [startDateOptions, setStartDateOptions] = useState([]);
  const [isTodaySelected, setIsTodaySelected] = useState(false);
  const [errors, setErrors] = useState({});

  const reasonOptions = [
    "Borrowing a Car",
    "Drive Away Cover",
    "Obtain Road Tax",
    "Need cover in an Emergency",
    "Back from Working Away",
    "Problem with Annual Policy",
    "Sharing Driving on a Long Trip",
    "Test Drive",
    "Temp Cover for Business Use",
    "Moving House",
    "Back from or going to University, College, School",
    "Courtesy Vehicle",
    "Pre-Booked MOT",
    "Drive Own Vehicle",
    "Add a Driver",
    "Buying a Vehicle",
    "Impounded Vehicle Release",
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.reasonForCover) newErrors.reasonForCover = "Reason for Cover is required.";
    if (!formData.durationType) newErrors.durationType = "Duration Type is required.";
    if (!formData.selectedDuration) newErrors.selectedDuration = "Cover Duration is required.";
    if (formData.selectedDuration === "Other" && !formData.customDuration) {
      newErrors.customDuration = "Custom duration is required.";
    }
    if (!formData.startDate) newErrors.startDate = "Start Date is required.";
    if (formData.startDate !== "Immediate Start" && !formData.hour) {
      newErrors.hour = "Hour selection is required.";
    }
    if (formData.startDate !== "Immediate Start" && !formData.minute) {
      newErrors.minute = "Minute selection is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      nextStep();
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
    }
  };

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const formatTodayDate = () => {
    const today = new Date();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayOfWeek = daysOfWeek[today.getDay()];
    const month = months[today.getMonth()];
    const dayOfMonth = today.getDate();
    const ordinalSuffix = getOrdinalSuffix(dayOfMonth);

    return `${dayOfWeek}, ${month} ${dayOfMonth}${ordinalSuffix}`;
  };

  useEffect(() => {
    const today = new Date();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const options = [{ value: "Immediate Start", label: "Immediate Start", disabled: false }];


    for (let i = 0; i < 20; i++) {
      const optionDate = new Date();
      optionDate.setDate(today.getDate() + i);

      const dayOfMonth = optionDate.getDate();
      const ordinalSuffix = getOrdinalSuffix(dayOfMonth);
      const optionText = `${daysOfWeek[optionDate.getDay()]}, ${months[optionDate.getMonth()]} ${dayOfMonth}${ordinalSuffix}`;

      options.push({ value: optionText, label: optionText, disabled: false });
    }

    setStartDateOptions(options);
    setFormData({
      ...formData,
      currentTime: `${today.getHours()}:${today.getMinutes()}`, // Set initial current time
    });
  }, []);

  const generateCustomDurationOptions = (type) => {
    const limit = type === "Days" ? 30 : 4; // 30 days for "Days", 4 weeks for "Weeks"
    return Array.from({ length: limit }, (_, i) => i + 1); // Generate numbers from 1 to limit
  };

  const handleStartDateChange = (value) => {
    if (value === "Immediate Start") {
      const now = new Date();
      const currentTime = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;
      // Save the current time in HH:mm format
      setFormData({
        ...formData,
        startDate: value,
        currentTime, // Update current time in formData
      });
    } else {
      setFormData({ ...formData, startDate: value, currentTime: "" });
    }
    const todayFormatted = formatTodayDate();
    setIsTodaySelected(value === todayFormatted);
  };

  const isPastTime = (hour, minute) => {
    const now = new Date();
    const selectedTime = new Date();
    selectedTime.setHours(hour, minute, 0);

    return selectedTime < now;
  };

  const generateTimeOptions = (limit, step = 1) => {
    return Array.from({ length: limit / step }, (_, i) => String(i * step).padStart(2, "0"));
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Step 2: Coverage Details</h2>
      <form className="space-y-6">
        {/* Reason for Cover */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Reason for Cover</label>
          <select
            value={formData.reasonForCover || ""}
            onChange={(e) => setFormData({ ...formData, reasonForCover: e.target.value })}
            className="mt-1 block w-full bg-white border p-2 rounded-md shadow-sm focus:outline-none"
          >
            <option value="">---- Select ----</option>
            {reasonOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.reasonForCover && <p className="text-red-500 text-sm">{errors.reasonForCover}</p>}
        </div>

        {/* Duration Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Duration Type</label>
          <div className="flex space-x-4 mt-2">
            {["Days", "Weeks"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFormData({ ...formData, durationType: type })}
                className={`w-full py-3 rounded-md text-white ${formData.durationType === type ? "bg-purple-800" : "bg-slate-400"
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
          {errors.durationType && <p className="text-red-500 text-sm">{errors.durationType}</p>}
        </div>

        {/* Cover Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            How long do you need cover for?
          </label>
          <div className="grid grid-cols-4 gap-4 mt-2">
            {[1, 3, 5, "Other"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    selectedDuration: item === "Other" ? "Other" : item,
                  })
                }
                className={`w-full py-3 rounded-md text-white ${formData.selectedDuration === item ? "bg-purple-800" : "bg-slate-400"
                  }`}
              >
                {item === "Other" ? "Other" : `${item} ${formData.durationType}`}
              </button>
            ))}
          </div>
          {errors.selectedDuration && (
            <p className="text-red-500 text-sm">{errors.selectedDuration}</p>
          )}
        </div>

        {/* Custom Duration */}
        {formData.selectedDuration === "Other" && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Choose a custom {formData.durationType.toLowerCase()} duration
            </label>
            <select
              value={formData.customDuration || ""}
              onChange={(e) => setFormData({ ...formData, customDuration: e.target.value })}
              className="mt-1 block w-full bg-white border p-2 rounded-md shadow-sm focus:outline-none"
            >
              <option value="">-- Select --</option>
              {generateCustomDurationOptions(formData.durationType).map((duration) => (
                <option key={duration} value={duration}>
                  {duration} {formData.durationType === "Days" ? "Day" : "Week"}
                  {duration > 1 ? "s" : ""}
                </option>
              ))}
            </select>
            {errors.customDuration && (
              <p className="text-red-500 text-sm">{errors.customDuration}</p>
            )}
          </div>
        )}

        {/* Start Date */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <select
            value={formData.startDate || ""}
            onChange={(e) => handleStartDateChange(e.target.value)}
            className="mt-1 block w-full bg-white border p-2 rounded-md shadow-sm focus:outline-none"
          > <option value="">-- Select --</option>
            {startDateOptions.map((option, index) => (
              <option key={index} value={option.label} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
        </div>

        {/* Display Current Time
        {formData.currentTime !== null && (
          <p className="text-sm text-gray-500">
            Current Time: <strong>{formData.currentTime}</strong>
          </p>
        )} */}

        {/* Time Selection */}
        {(formData.startDate !== "Immediate Start" && formData.startDate !== null)&& (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Hours</label>
              <select
                value={formData.hour || ""}
                onChange={(e) => setFormData({ ...formData, hour: e.target.value })}
                className="mt-1 block w-full bg-white border p-2 rounded-md shadow-sm focus:outline-none"
              >
                <option value="">--</option>
                {generateTimeOptions(24).map((hour) => (
                  <option
                    key={hour}
                    value={hour}
                    disabled={isTodaySelected && isPastTime(parseInt(hour, 10), formData.minute || 0)}
                  >
                    {hour}
                  </option>
                ))}
              </select>
              {errors.hour && <p className="text-red-500 text-sm">{errors.hour}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Minutes</label>
              <select
                value={formData.minute || ""}
                onChange={(e) => setFormData({ ...formData, minute: e.target.value })}
                className="mt-1 block w-full bg-white border p-2 rounded-md shadow-sm focus:outline-none"
              >
                <option value="">--</option>
                {generateTimeOptions(60, 15).map((minute) => (
                  <option
                    key={minute}
                    value={minute}
                    disabled={isTodaySelected && isPastTime(formData.hour || currentTime.hour, parseInt(minute, 10))}
                  >
                    {minute}
                  </option>
                ))}
              </select>
              {errors.minute && <p className="text-red-500 text-sm">{errors.minute}</p>}
            </div>
          </div>
        )}

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

export default Step2;
