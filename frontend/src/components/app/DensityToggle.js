/** @format */

import React from "react";
import { ViewBoardsIcon, ViewListIcon } from "@heroicons/react/outline";
import {
  actionHoverClassNames,
  appInsetStyle,
  classNames,
} from "./appTheme";

const options = [
  {
    value: "comfortable",
    label: "Comfortable",
    icon: ViewBoardsIcon,
  },
  {
    value: "compact",
    label: "Compact",
    icon: ViewListIcon,
  },
];

const DensityToggle = ({ density, onChange, className = "" }) => (
  <div
    className={classNames(
      "inline-flex items-center gap-1 rounded-full bg-slate-100 p-1",
      className
    )}
    style={appInsetStyle}>
    {options.map((option) => {
      const active = density === option.value;

      return (
        <button
          key={option.value}
          type='button'
          onClick={() => onChange(option.value)}
          aria-label={option.label}
          title={option.label}
          className={classNames(
            "inline-flex items-center justify-center gap-2 rounded-full px-2.5 py-2 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-amber-300 xl:px-3.5",
            active
              ? "bg-white text-slate-950 shadow-sm ring-1 ring-slate-200"
              : `text-slate-600 ${actionHoverClassNames.neutral}`
          )}>
          <option.icon className='h-4 w-4' aria-hidden='true' />
          <span className='hidden xl:inline'>{option.label}</span>
        </button>
      );
    })}
  </div>
);

export default DensityToggle;
