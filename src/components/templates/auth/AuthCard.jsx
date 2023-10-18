import React from "react";
import { LogoTitleWhite } from "../../../assets/svg/logo/LogoTitleWhite";

const AuthCard = ({ title = "Bienvenidos", subtitle = "", children }) => {
  return (
    <div className="lg:w-2/5 md:w-1/2 w-[80%] bg-white flex justify-center items-center flex-col p-10">
      <div className="flex justify-center items-center flex-col mb-10">
        <LogoTitleWhite
          sx={{
            width: "15rem",
            height: "6em",
          }}
        />
      </div>
      <h1 className="font-bold text-2xl text-primary ">{title}</h1>
      <p className="font-base text-md ">{subtitle}</p>
      {children}
    </div>
  );
};

export default AuthCard;
