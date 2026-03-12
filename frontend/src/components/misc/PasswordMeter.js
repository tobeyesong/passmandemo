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
      className='relative overflow-hidden rounded-[1.35rem] px-4 py-4'
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(241,245,249,0.94) 100%)",
        boxShadow:
          "inset 0 0 0 1px rgba(186, 200, 214, 0.26), 0 10px 24px rgba(15, 23, 42, 0.05)",
      }}>
      <div className='pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white/90 via-white/30 to-transparent' />
      <div className='relative flex items-center justify-between gap-3'>
        <span className='text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500'>
          Password Strength
        </span>
        <span className='rounded-full bg-white/80 px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.12)]'>
          {config.label}
        </span>
      </div>
      <div className='relative mt-4 h-2.5 overflow-hidden rounded-full bg-slate-200/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.75)]'>
        <div
          className='h-full rounded-full transition-all duration-500 ease-out'
          style={{
            width: config.width,
            background: config.fill,
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.45), 0 6px 16px rgba(99, 102, 241, 0.18)",
          }}
        />
        <div className='pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/55 to-transparent' />
      </div>
    </div>
  );
};

export default PasswordMeter;
