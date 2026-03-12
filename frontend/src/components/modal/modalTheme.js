/** @format */

import React from "react";
import { XCircleIcon } from "@heroicons/react/solid";

const classNames = (...classes) => classes.filter(Boolean).join(" ");

export const modalPanelStyle = {
  background:
    "linear-gradient(180deg, rgba(250, 250, 249, 0.98) 0%, rgba(248, 250, 252, 0.96) 100%)",
  boxShadow:
    "0 38px 90px rgba(15, 23, 42, 0.25), 0 16px 36px rgba(15, 23, 42, 0.12)",
};

export const modalHeaderStyle = {
  boxShadow:
    "0 22px 48px rgba(15, 23, 42, 0.24), 0 10px 18px rgba(15, 23, 42, 0.12)",
};

export const modalSurfaceStyle = {
  boxShadow:
    "0 18px 42px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
};

export const modalInsetStyle = {
  boxShadow: "inset 0 0 0 1px rgba(148, 163, 184, 0.25)",
};

export const modalIconButtonStyle = {
  boxShadow: "0 4px 12px rgba(148, 163, 184, 0.18)",
};

export const modalPrimaryButtonStyle = {
  boxShadow: "0 10px 26px rgba(15, 23, 42, 0.18)",
};

export const modalDangerButtonStyle = {
  boxShadow: "0 10px 26px rgba(220, 38, 38, 0.22)",
};

export const modalErrorStyle = {
  boxShadow: "inset 0 0 0 1px rgba(248, 113, 113, 0.22)",
};

export const modalInputClassName =
  "block w-full rounded-[1.25rem] border-0 bg-slate-100 px-4 py-3 text-[15px] leading-6 text-slate-900 placeholder-slate-400 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300";

export const modalTextareaClassName = `${modalInputClassName} min-h-[12rem] resize-y`;

export const modalSecondaryButtonClassName =
  "inline-flex w-full items-center justify-center rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 sm:w-auto";

export const modalPrimaryButtonClassName =
  "inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 sm:w-auto";

export const modalDangerButtonClassName =
  "inline-flex w-full items-center justify-center rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 sm:w-auto";

export const modalSectionEyebrowClassName =
  "text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500";

export const modalSectionTitleClassName =
  "text-2xl font-semibold leading-tight text-slate-900";

export const modalSectionCopyClassName =
  "max-w-sm text-sm leading-6 text-slate-600";

export const modalActionRowClassName =
  "flex flex-col-reverse gap-3 border-t border-slate-200/80 pt-6 sm:flex-row sm:justify-end";

export const ModalHeader = ({
  eyebrow,
  title,
  description,
  tone = "default",
}) => {
  const isDanger = tone === "danger";

  return (
    <div
      className='relative overflow-hidden rounded-[1.75rem] bg-slate-900 px-6 py-6 text-white sm:px-8 sm:py-7'
      style={modalHeaderStyle}>
      <div
        className={classNames(
          "pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l",
          isDanger
            ? "from-red-300/35 via-orange-200/15 to-transparent"
            : "from-amber-300/40 via-orange-200/15 to-transparent"
        )}
      />
      <div
        className={classNames(
          "pointer-events-none absolute bottom-0 left-0 top-0 w-1.5 rounded-full",
          isDanger ? "bg-red-300/85" : "bg-amber-300/85"
        )}
      />
      <p
        className={classNames(
          "relative text-[11px] font-semibold uppercase tracking-[0.3em]",
          isDanger ? "text-red-100" : "text-amber-200"
        )}>
        {eyebrow}
      </p>
      <h2 className='relative mt-3 max-w-3xl text-3xl font-semibold leading-tight text-white'>
        {title}
      </h2>
      {description ? (
        <p className='relative mt-3 max-w-2xl text-sm leading-6 text-slate-300'>
          {description}
        </p>
      ) : null}
    </div>
  );
};

export const ModalSurface = ({ children, className = "" }) => (
  <div
      className={classNames(
      "relative mt-5 rounded-[1.75rem] bg-white/95 p-6 ring-1 ring-slate-900/5 sm:p-8",
      className
    )}
    style={modalSurfaceStyle}>
    {children}
  </div>
);

export const ModalSection = ({
  eyebrow,
  title,
  description,
  children,
  className = "",
}) => (
  <section
    className={classNames(
      "grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)]",
      className
    )}>
    <div className='space-y-3'>
      <p className={modalSectionEyebrowClassName}>{eyebrow}</p>
      <div className='space-y-2'>
        <h3 className={modalSectionTitleClassName}>{title}</h3>
        {description ? (
          <p className={modalSectionCopyClassName}>{description}</p>
        ) : null}
      </div>
    </div>
    <div className='space-y-5'>{children}</div>
  </section>
);

export const ModalField = ({
  label,
  error,
  hint,
  children,
  htmlFor,
  className = "",
}) => (
  <div className={classNames("space-y-2.5", className)}>
    {label ? (
      <label
        htmlFor={htmlFor}
        className='block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500'>
        {label}
      </label>
    ) : null}
    {children}
    {hint ? <p className='text-sm leading-6 text-slate-500'>{hint}</p> : null}
    {error ? <ModalErrorNotice message={error} /> : null}
  </div>
);

export const ModalErrorNotice = ({ message, className = "" }) =>
  message ? (
    <div
      className={classNames(
        "flex items-start gap-3 rounded-[1.25rem] bg-red-50 px-4 py-3 text-sm text-red-700",
        className
      )}
      style={modalErrorStyle}>
      <XCircleIcon className='mt-0.5 h-5 w-5 flex-shrink-0 text-red-400' />
      <p className='leading-6'>{message}</p>
    </div>
  ) : null;
