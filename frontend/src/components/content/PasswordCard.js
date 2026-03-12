/** @format */

import React from "react";
import { Link } from "react-router-dom";
import {
  ChevronDoubleUpIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import SiteLogo from "../misc/SiteLogo";
import {
  appActionButtonStyle,
  appActionIconButtonClassName,
  appCardStyle,
} from "../app/appTheme";

const withProtocol = (value) =>
  /^https?:\/\//i.test(value || "") ? value : `https://${value || ""}`;

const compactActionClassName =
  "inline-flex h-9 w-9 items-center justify-center rounded-[0.95rem] bg-white text-slate-600 transition duration-200 hover:-translate-y-0.5 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-amber-300";

const PasswordCard = ({ password, backgroundLocation, compact = false }) => {
  const siteHref = withProtocol(password.url);
  const id = password._id || password.objectID;

  if (compact) {
    return (
      <article
        className='group relative overflow-hidden rounded-[1.35rem] bg-white/95 p-4 ring-1 ring-slate-900/5 transition duration-200 hover:-translate-y-0.5 hover:ring-slate-900/10'
        style={appCardStyle}>
        <div className='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-300 via-orange-300 to-sky-300 opacity-0 transition duration-200 group-hover:opacity-100' />
        <div className='flex min-w-0 items-center gap-3'>
          <SiteLogo
            url={password.url}
            size={40}
            className='h-12 w-12 flex-shrink-0 rounded-[1rem] bg-white p-2.5 object-contain ring-1 ring-slate-200 shadow-sm'
          />
          <div className='min-w-0 flex-1'>
            <a
              href={siteHref}
              className='block truncate text-sm font-semibold text-slate-950 transition hover:text-slate-700'>
              {password.url}
            </a>
            <p className='mt-1 truncate text-sm text-slate-600'>
              {password.username}
            </p>
          </div>
          <div className='flex flex-shrink-0 gap-2'>
            <a
              href={siteHref}
              className={compactActionClassName}
              style={appActionButtonStyle}
              aria-label={`Open ${password.url}`}>
              <ChevronDoubleUpIcon className='h-4 w-4' aria-hidden='true' />
            </a>
            <Link
              to={`/password/${id}/edit`}
              state={{ backgroundLocation }}
              className={compactActionClassName}
              style={appActionButtonStyle}
              aria-label={`Edit ${password.url}`}>
              <PencilIcon className='h-4 w-4' aria-hidden='true' />
            </Link>
            <Link
              to={`/password/${id}/delete`}
              state={{ backgroundLocation }}
              className={compactActionClassName}
              style={appActionButtonStyle}
              aria-label={`Delete ${password.url}`}>
              <TrashIcon className='h-4 w-4' aria-hidden='true' />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className='group relative overflow-hidden rounded-[1.75rem] bg-white/95 p-5 ring-1 ring-slate-900/5 transition duration-200 hover:-translate-y-1 hover:ring-slate-900/10'
      style={appCardStyle}>
      <div className='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-300 via-orange-300 to-sky-300 opacity-0 transition duration-200 group-hover:opacity-100' />

      <div className='absolute right-5 top-5 flex gap-2'>
        <a
          href={siteHref}
          className={appActionIconButtonClassName}
          style={appActionButtonStyle}
          aria-label={`Open ${password.url}`}>
          <ChevronDoubleUpIcon className='h-5 w-5' aria-hidden='true' />
        </a>
        <Link
          to={`/password/${id}/edit`}
          state={{ backgroundLocation }}
          className={appActionIconButtonClassName}
          style={appActionButtonStyle}
          aria-label={`Edit ${password.url}`}>
          <PencilIcon className='h-5 w-5' aria-hidden='true' />
        </Link>
        <Link
          to={`/password/${id}/delete`}
          state={{ backgroundLocation }}
          className={appActionIconButtonClassName}
          style={appActionButtonStyle}
          aria-label={`Delete ${password.url}`}>
          <TrashIcon className='h-5 w-5' aria-hidden='true' />
        </Link>
      </div>

      <div className='flex min-w-0 items-start gap-4'>
        <SiteLogo
          url={password.url}
          size={56}
          className='h-16 w-16 flex-shrink-0 rounded-[1.35rem] bg-white p-3 object-contain ring-1 ring-slate-200 shadow-sm'
        />
        <div className='min-w-0 flex-1 pr-28'>
          <p className='text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500'>
            Website
          </p>
          <a
            href={siteHref}
            className='mt-2 block truncate text-lg font-semibold tracking-tight text-slate-950 transition hover:text-slate-700'>
            {password.url}
          </a>
          <p className='mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500'>
            Username
          </p>
          <p className='mt-2 truncate text-sm font-medium text-slate-700'>
            {password.username}
          </p>
        </div>
      </div>

      <p className='mt-6 text-sm leading-6 text-slate-600'>
        {password.notes
          ? "Includes private notes or recovery details for this credential."
          : "No supporting note saved yet."}
      </p>

      <div className='mt-6 flex items-center justify-between gap-3'>
        <span className='inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-700'>
          Password
        </span>
        <span className='text-sm text-slate-500'>Ready in one click</span>
      </div>
    </article>
  );
};

export default PasswordCard;
