import React from "react";

const Badge = ({ title = "", selected = false, setSelected = () => null }) => {
  return (
    <div
      className={`px-4  py-2 rounded-full cursor-pointer text-sm ${
        selected ? "bg-primary text-white" : "bg-white text-gray_text"
      } `}
      onClick={() => setSelected(title)}
    >
      {title}
    </div>
  );
};

export default Badge;
