import React from "react";
import { Oval } from "react-loader-spinner";

function LoaderComponent() {
  return (
    <div className="fixed top-0 left-0  w-full h-full flex justify-center items-center z-50 bg-[#000000] opacity-30">
      <Oval
        height={80}
        width={80}
        color="#5528E3"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#5528E3"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
}

export default LoaderComponent;
