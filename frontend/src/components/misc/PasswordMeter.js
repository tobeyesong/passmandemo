/** @format */

import React from "react";
import zxcvbn from "zxcvbn";

const strengthConfig = {
  0: {
    label: "Needs work",
    width: "8%",
    fill: "linear-gradient(90deg, #cbd5e1 0%, #94a3b8 100%)",
  },
  1: {
    label: "Unsteady",
    width: "28%",
    fill: "linear-gradient(90deg, #ef4444 0%, #fb923c 100%)",
  },
  2: {
    label: "Feeble",
    width: "52%",
    fill: "linear-gradient(90deg, #f59e0b 0%, #facc15 100%)",
  },
  3: {
    label: "Acceptable",
    width: "76%",
    fill: "linear-gradient(90deg, #0ea5e9 0%, #34d399 100%)",
  },
  4: {
    label: "Exceptional",
    width: "100%",
    fill: "linear-gradient(90deg, #34d399 0%, #818cf8 100%)",
  },
};

const PasswordMeter = ({ target }) => {
  const { score } = zxcvbn(target);
  const config = strengthConfig[score];

  return (
    <div
      className='rounded-[1.25rem] bg-slate-100 px-4 py-3'
      style={{ boxShadow: "inset 0 0 0 1px rgba(148, 163, 184, 0.2)" }}>
      <div className='flex items-center justify-between gap-3'>
        <span className='text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500'>
          Password strength
        </span>
        <span className='text-xs font-semibold text-slate-700'>
          {config.label}
        </span>
      </div>
      <div className='mt-3 h-2.5 overflow-hidden rounded-full bg-slate-200'>
        <div
          className='h-full rounded-full transition-all duration-500 ease-out'
          style={{
            width: config.width,
            background: config.fill,
          }}
        />
      </div>
    </div>
  );
};

export default PasswordMeter;
