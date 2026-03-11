/** @format */

import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { TrashIcon, PencilIcon } from "@heroicons/react/outline";
import Loader from "../loader/Loader";
import NoteState from "../emptyState/noteState";
import { useNotesQuery } from "../../hooks/useNotes";

const PasswordContent = (props) => {
  const location = useLocation();
  const { data: notes = [], isLoading, error } = useNotesQuery();

  return (
    <div>
      <main className='relative flex-1 overflow-y-auto focus:outline-none'>
        <div className='py-6'>
          <div className='px-4 mx-auto max-w-7xl sm:px-6 md:px-8'>
            <div>
              <h1 className='text-2xl font-semibold text-gray-900'>
                {props.title}
              </h1>
              <Fragment>
                {isLoading ? (
                  <Loader />
                ) : error ? (
                  <h3 className='animate-pulse'>{error.message}</h3>
                ) : notes.length === 0 ? (
                  <NoteState />
                ) : (
                  <Fragment>
                    <ul className='grid grid-cols-1 gap-5 mt-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4'>
                      {notes.map((note) => (
                        <li
                          key={note._id}
                          className='group relative flex col-span-1 rounded-md border-r-4 border-transparent shadow-sm transition hover:border-yellow-400'>
                          <img
                            alt='logo'
                            src='https://media.publit.io/file/noun-triangle.svg'
                            className='flex items-center flex-shrink-0 object-contain text-sm font-medium text-white shadow-sm w-14 rounded-l-md'
                          />

                          <div className='flex min-w-0 flex-1 flex-row-reverse items-center truncate rounded-r-md border border-gray-200 bg-white'>
                            <div className='flex-1 px-4 py-2 pr-12 text-sm truncate'>
                              {note.title}
                              <p className='text-gray-500 truncate '>
                                {note.caption}
                              </p>
                            </div>
                          </div>

                          <div className='pointer-events-none absolute right-2 top-2 z-10 flex gap-1 opacity-0 translate-y-1 transition-all duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0'>
                            <Link
                              to={`/note/${note._id}/edit`}
                              state={{ backgroundLocation: location }}
                              type='button'
                              className='card-action-button glass hover:border-slate-200/45 hover:bg-slate-600/70 hover:text-white'>
                              <PencilIcon className='h-5 w-5' aria-hidden='true' />
                            </Link>
                            <Link
                              to={`/note/${note._id}/delete`}
                              state={{ backgroundLocation: location }}
                              type='button'
                              className='card-action-button glass hover:border-red-200/45 hover:bg-red-500/75 hover:text-white'>
                              <TrashIcon className='h-5 w-5' aria-hidden='true' />
                            </Link>
                          </div>
                        </li>
                      ))}
                    </ul>{" "}
                  </Fragment>
                )}
              </Fragment>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PasswordContent;
