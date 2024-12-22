import React from "react";

const ProgressBar = ({ step }) => {
  return (
    <div className="w-full bg-gray-200 h-2 mb-4 rounded">
      <div
        className={`h-2 bg-purple-800 rounded transition-all duration-300`}
        style={{ width: `${(step / 5) * 100}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
