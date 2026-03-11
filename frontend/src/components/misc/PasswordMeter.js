/** @format */

import React from "react";
import zxcvbn from "zxcvbn";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PasswordMeter = ({ target }) => {
  const testResult = zxcvbn(target);
  const num = (testResult.score * 100) / 4;

  const createPassLabel = () => {
    switch (testResult.score) {
      case 1:
        return "UNSTEADY";
      case 2:
        return "FEEBLE";
      case 3:
        return "ACCEPTABLE";
      case 4:
        return "EXCEPTIONAL";
      default:
        return "";
    }
  };

  const passwordColor = {
    25: "bg-gradient-to-r from-red-500  to-yellow-500 w-1/4 ",
    50: "bg-gradient-to-r from-yellow-600  to-yellow-400 w-2/4",
    75: "bg-gradient-to-r from-blue-600  to-green-300 w-3/4",
    100: "bg-gradient-to-r from-green-400  to-purple-400 w-full",
  };
  return (
    <div
      className={classNames(
        passwordColor[num],
        "mt-1 mb-2 transition-all bg-gold-400 duration-1000 ease-in-out rounded-md "
      )}>
      <div className='ml-3'>
        <h3 className='text-sm font-medium text-gray-50'>
          {createPassLabel()}
        </h3>
      </div>
    </div>
  );
};

export default PasswordMeter;
