/** @format */

import React from "react";
import { CollectionIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

export const classNames = (...classes) => classes.filter(Boolean).join(" ");

export const appPageStyle = {
  background:
    "linear-gradient(180deg, rgba(248, 246, 241, 1) 0%, rgba(238, 242, 247, 1) 100%)",
};

export const appPanelStyle = {
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  boxShadow:
    "0 24px 60px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
};

export const appCardStyle = {
  boxShadow:
    "0 18px 45px rgba(15, 23, 42, 0.08), 0 6px 18px rgba(15, 23, 42, 0.04)",
};

export const appInsetStyle = {
  boxShadow: "inset 0 0 0 1px rgba(148, 163, 184, 0.16)",
};

export const appActionButtonStyle = {
  boxShadow:
    "0 8px 18px rgba(15, 23, 42, 0.08), inset 0 0 0 1px rgba(148, 163, 184, 0.14)",
};

export const appPrimaryButtonStyle = {
  boxShadow:
    "0 16px 30px rgba(217, 119, 6, 0.22), 0 8px 16px rgba(15, 23, 42, 0.08)",
};

export const appSidebarStyle = {
  background:
    "linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%)",
  boxShadow: "inset -1px 0 0 rgba(148, 163, 184, 0.16)",
};

export const appTopBarStyle = {
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  boxShadow:
    "0 16px 40px rgba(15, 23, 42, 0.06), inset 0 -1px 0 rgba(255, 255, 255, 0.72)",
};

export const appSearchFieldStyle = {
  boxShadow: "inset 0 0 0 1px rgba(148, 163, 184, 0.14)",
};

export const appPanelClassName =
  "relative min-w-0 overflow-hidden rounded-[2rem] bg-white/80 ring-1 ring-white/70";

export const appActionIconButtonClassName =
  "inline-flex h-10 w-10 items-center justify-center rounded-[1rem] bg-white/90 text-slate-600 ring-1 ring-transparent transition duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-300";

export const appPrimaryLinkClassName =
  "inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2";

export const appSecondaryLinkClassName =
  "inline-flex items-center justify-center gap-2 rounded-full bg-white/90 px-5 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-amber-300";

export const actionHoverClassNames = {
  neutral: "hover:bg-slate-100 hover:text-slate-950 hover:ring-slate-200",
  open: "hover:bg-sky-50 hover:text-sky-700 hover:ring-sky-200",
  edit: "hover:bg-cyan-50 hover:text-cyan-700 hover:ring-cyan-200",
  delete: "hover:bg-red-50 hover:text-red-600 hover:ring-red-200",
};

export const AppBackdrop = () => (
  <div className='pointer-events-none absolute inset-0 overflow-hidden'>
    <div className='absolute -top-16 left-[14%] h-72 w-72 rounded-full bg-amber-200/45 blur-3xl' />
    <div className='absolute right-[10%] top-[22%] h-80 w-80 rounded-full bg-sky-200/35 blur-3xl' />
    <div className='absolute bottom-[-4rem] left-[32%] h-72 w-72 rounded-full bg-rose-100/35 blur-3xl' />
  </div>
);

export const AppPanel = ({ children, className = "" }) => (
  <div className={classNames(appPanelClassName, className)} style={appPanelStyle}>
    <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent' />
    {children}
  </div>
);

export const AppSectionHeader = ({
  eyebrow,
  title,
  description,
  count,
  action,
}) => (
  <div className='flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between'>
    <div className='space-y-3'>
      <p className='text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-700'>
        {eyebrow}
      </p>
      <div className='space-y-2'>
        <h1 className='text-3xl font-semibold tracking-tight text-slate-950'>
          {title}
        </h1>
        {description ? (
          <p className='max-w-2xl text-sm leading-6 text-slate-600'>
            {description}
          </p>
        ) : null}
      </div>
    </div>
    <div className='flex flex-wrap items-center gap-3'>
      {typeof count === "number" ? (
        <div
          className='inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600'
          style={appInsetStyle}>
          <span className='h-2 w-2 rounded-full bg-amber-400' />
          {count} {count === 1 ? "item" : "items"}
        </div>
      ) : null}
      {action}
    </div>
  </div>
);

export const AppPrimaryLink = ({
  to,
  state,
  children,
  className = "",
}) => (
  <Link
    to={to}
    state={state}
    className={classNames(appPrimaryLinkClassName, className)}
    style={appPrimaryButtonStyle}>
    {children}
  </Link>
);

export const AppSecondaryLink = ({
  to,
  state,
  children,
  className = "",
  tone = "default",
}) => {
  const heroTone = tone === "hero";

  return (
    <Link
      to={to}
      state={state}
      className={classNames(
        heroTone
          ? "inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/14 transition duration-200 hover:-translate-y-0.5 hover:bg-white/[0.14] focus:outline-none focus:ring-2 focus:ring-amber-300"
          : appSecondaryLinkClassName,
        className
      )}
      style={
        heroTone
          ? {
              boxShadow:
                "inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 12px 26px rgba(15, 23, 42, 0.14)",
            }
          : appActionButtonStyle
      }>
      {children}
    </Link>
  );
};

export const AppEmptyState = ({
  eyebrow,
  icon: Icon,
  title,
  description,
  actionTo,
  actionState,
  actionIcon: ActionIcon,
  actionLabel,
}) => (
  <AppPanel className='px-6 py-12 sm:px-8 sm:py-14'>
    <div className='mx-auto flex max-w-xl flex-col items-center text-center'>
      <div
        className='flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-white text-slate-700'
        style={appCardStyle}>
        <Icon className='h-8 w-8' aria-hidden='true' />
      </div>
      <p className='mt-6 text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-700'>
        {eyebrow}
      </p>
      <h3 className='mt-3 text-2xl font-semibold tracking-tight text-slate-950'>
        {title}
      </h3>
      <p className='mt-3 max-w-md text-sm leading-6 text-slate-600'>
        {description}
      </p>
      {actionTo ? (
        <AppPrimaryLink
          to={actionTo}
          state={actionState}
          className='mt-8'>
          {ActionIcon ? <ActionIcon className='h-5 w-5' aria-hidden='true' /> : null}
          {actionLabel}
        </AppPrimaryLink>
      ) : null}
    </div>
  </AppPanel>
);

export const AppDashedEmptyState = ({
  icon: Icon,
  title,
  description,
  className = "",
}) => (
  <div
    className={classNames(
      "rounded-[1.75rem] border border-dashed border-slate-300/80 bg-slate-50/70 px-6 py-12 sm:px-8",
      className
    )}>
    <div className='mx-auto flex max-w-md flex-col items-center text-center'>
      <div
        className='flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-white text-slate-600'
        style={appCardStyle}>
        <Icon className='h-7 w-7' aria-hidden='true' />
      </div>
      <h3 className='mt-5 text-xl font-semibold tracking-tight text-slate-950'>
        {title}
      </h3>
      <p className='mt-3 text-sm leading-6 text-slate-600'>{description}</p>
    </div>
  </div>
);

export const AppLoader = ({ label = "Loading secure workspace" }) => (
  <div className='flex justify-center py-10'>
    <div
      className='inline-flex items-center gap-3 rounded-full bg-white/90 px-4 py-3 text-sm font-semibold text-slate-600'
      style={appCardStyle}>
      <CollectionIcon className='h-5 w-5 animate-pulse text-amber-500' />
      <span>{label}</span>
    </div>
  </div>
);

export const AppMetaNote = ({ children, className = "" }) => (
  <p
    className={classNames(
      "text-xs leading-6 text-slate-500",
      className
    )}>
    {children}
  </p>
);

export const AppClosingAction = ({
  eyebrow,
  title,
  description,
  primaryTo,
  primaryState,
  primaryIcon: PrimaryIcon,
  primaryLabel,
  secondaryTo,
  secondaryState,
  secondaryIcon: SecondaryIcon,
  secondaryLabel,
}) => (
  <div className='flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between'>
    <div className='max-w-2xl space-y-3'>
      <p className='text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-700'>
        {eyebrow}
      </p>
      <div className='space-y-2'>
        <h2 className='text-2xl font-semibold tracking-tight text-slate-950 sm:text-[2rem]'>
          {title}
        </h2>
        <p className='text-sm leading-6 text-slate-600'>{description}</p>
      </div>
    </div>
    <div className='flex flex-wrap items-center gap-3'>
      {primaryTo ? (
        <AppPrimaryLink to={primaryTo} state={primaryState}>
          {PrimaryIcon ? <PrimaryIcon className='h-5 w-5' aria-hidden='true' /> : null}
          {primaryLabel}
        </AppPrimaryLink>
      ) : null}
      {secondaryTo ? (
        <AppSecondaryLink to={secondaryTo} state={secondaryState}>
          {SecondaryIcon ? (
            <SecondaryIcon className='h-5 w-5' aria-hidden='true' />
          ) : null}
          {secondaryLabel}
        </AppSecondaryLink>
      ) : null}
    </div>
  </div>
);
