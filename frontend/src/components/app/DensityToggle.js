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

const DensityToggle = ({
  density,
  onChange,
  className = "",
  tone = "default",
}) => {
  const heroTone = tone === "hero";

  return (
    <div
      className={classNames(
        "inline-flex items-center gap-1 rounded-full p-1",
        heroTone ? "bg-white/10 ring-1 ring-white/10" : "bg-slate-100",
        className
      )}
      style={
        heroTone
          ? {
              boxShadow:
                "inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 16px 34px rgba(15, 23, 42, 0.12)",
            }
          : appInsetStyle
      }>
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
              heroTone
                ? active
                  ? "bg-white text-slate-950 shadow-[0_10px_24px_rgba(15,23,42,0.18)] ring-1 ring-white/70"
                  : "text-white/[0.72] hover:bg-white/10 hover:text-white"
                : active
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
};

export default DensityToggle;
