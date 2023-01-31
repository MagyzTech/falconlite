import React from "react";

export const Spinner = () => {
  return (
    <div className=" flex justify-center items-center">
      <div className="animate-spin rounded-full h-[20px] w-[20px] border-b-2 border-[azure]"></div>
    </div>
  );
};
