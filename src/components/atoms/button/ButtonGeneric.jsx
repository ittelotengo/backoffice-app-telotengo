import React from "react";

const ButtonGeneric = ({
  type = "submit",
  text = "Guardar",
  className = "",
  onCLick = () => null,
  withBorder = false,
  disabled = false,
  ...props
}) => {
  return !withBorder ? (
    <button
      type={type}
      className={`${
        disabled
          ? "bg-gray_button_disabled border-gray_button_disabled"
          : "bg-primary border-primary text-white"
      } px-4 py-3 border-2  rounded-sm h-full font-montserrat font-semibold ${className}`}
      onClick={onCLick}
      disabled={disabled}
      {...props}
    >
      {text}
    </button>
  ) : (
    <button
      type={type}
      className={`bg-white px-4 py-3 rounded-sm h-full  border-2 border-primary text-primary rounderd-sm font-montserrat font-semibold ${className}`}
      onClick={onCLick}
      {...props}
    >
      {text}
    </button>
  );
};

export default ButtonGeneric;
