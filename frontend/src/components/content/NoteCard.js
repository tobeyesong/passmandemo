/** @format */

import React from "react";
import { Link } from "react-router-dom";
import {
  DocumentTextIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import {
  appActionButtonStyle,
  appActionIconButtonClassName,
  appCardStyle,
} from "../app/appTheme";

const compactActionClassName =
  "inline-flex h-9 w-9 items-center justify-center rounded-[0.95rem] bg-white text-slate-600 transition duration-200 hover:-translate-y-0.5 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-amber-300";

const NoteCard = ({ note, backgroundLocation, compact = false }) => {
  const id = note._id || note.objectID;

  if (compact) {
    return (
      <article
        className='group relative overflow-hidden rounded-[1.35rem] bg-white/95 p-4 ring-1 ring-slate-900/5 transition duration-200 hover:-translate-y-0.5 hover:ring-slate-900/10'
        style={appCardStyle}>
        <div className='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-300 via-cyan-200 to-amber-200 opacity-0 transition duration-200 group-hover:opacity-100' />
        <div className='flex min-w-0 items-center gap-3'>
          <div className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[1rem] bg-sky-50 text-sky-700 ring-1 ring-sky-100'>
            <DocumentTextIcon className='h-6 w-6' aria-hidden='true' />
          </div>
          <div className='min-w-0 flex-1'>
            <h2 className='truncate text-sm font-semibold text-slate-950'>
              {note.title}
            </h2>
            <p className='mt-1 truncate text-sm text-slate-600'>
              {note.caption}
            </p>
          </div>
          <div className='flex flex-shrink-0 gap-2'>
            <Link
              to={`/note/${id}/edit`}
              state={{ backgroundLocation }}
              className={compactActionClassName}
              style={appActionButtonStyle}
              aria-label={`Edit ${note.title}`}>
              <PencilIcon className='h-4 w-4' aria-hidden='true' />
            </Link>
            <Link
              to={`/note/${id}/delete`}
              state={{ backgroundLocation }}
              className={compactActionClassName}
              style={appActionButtonStyle}
              aria-label={`Delete ${note.title}`}>
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
      <div className='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-300 via-cyan-200 to-amber-200 opacity-0 transition duration-200 group-hover:opacity-100' />

      <div className='absolute right-5 top-5 flex gap-2'>
        <Link
          to={`/note/${id}/edit`}
          state={{ backgroundLocation }}
          className={appActionIconButtonClassName}
          style={appActionButtonStyle}
          aria-label={`Edit ${note.title}`}>
          <PencilIcon className='h-5 w-5' aria-hidden='true' />
        </Link>
        <Link
          to={`/note/${id}/delete`}
          state={{ backgroundLocation }}
          className={appActionIconButtonClassName}
          style={appActionButtonStyle}
          aria-label={`Delete ${note.title}`}>
          <TrashIcon className='h-5 w-5' aria-hidden='true' />
        </Link>
      </div>

      <div className='flex min-w-0 items-start gap-4'>
        <div
          className='flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-[1.35rem] bg-sky-50 text-sky-700 ring-1 ring-sky-100'
          style={appCardStyle}>
          <DocumentTextIcon className='h-8 w-8' aria-hidden='true' />
        </div>
        <div className='min-w-0 flex-1 pr-24'>
          <p className='text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500'>
            Secure note
          </p>
          <h2 className='mt-2 truncate text-lg font-semibold tracking-tight text-slate-950'>
            {note.title}
          </h2>
          <p className='mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500'>
            Preview
          </p>
        </div>
      </div>

      <p className='mt-4 max-h-24 overflow-hidden text-sm leading-6 text-slate-600'>
        {note.caption}
      </p>

      <div className='mt-6 flex items-center justify-between gap-3'>
        <span className='inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700'>
          Note
        </span>
        <span className='text-sm text-slate-500'>Quick reference</span>
      </div>
    </article>
  );
};

export default NoteCard;
