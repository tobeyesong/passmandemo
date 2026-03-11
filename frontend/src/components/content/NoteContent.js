/** @format */

import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { TrashIcon, PencilIcon } from "@heroicons/react/outline";
import Loader from "../loader/Loader";
import NoteState from "../emptyState/noteState";
import { useNotesQuery } from "../../hooks/useNotes";

const PasswordContent = (props) => {
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
                    <ul className='grid grid-cols-1 gap-5 mt-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 group'>
                      {notes.map((note) => (
                        <div key={note._id}>
                          <div className='border-r-4 rounded-md hover:border-yellow-400'>
                            <li className='flex col-span-1 rounded-md shadow-sm'>
                              <img
                                alt='logo'
                                src='https://media.publit.io/file/noun-triangle.svg'
                                className='flex items-center flex-shrink-0 object-contain text-sm font-medium text-white shadow-sm w-14 rounded-l-md' //media.publit.io/file/triangle/orangeTriangle.svg","
                              />

                              <div className='flex flex-row-reverse items-center flex-1 truncate bg-white border-t border-b border-r border-gray-200 rounded-r-md'>
                                <div className='flex-1 px-4 py-2 text-sm truncate'>
                                  {note.title}
                                  <p className='text-gray-500 truncate '>
                                    {note.caption}
                                  </p>
                                </div>
                                <div className='absolute flex-shrink-0 m-2 transform scale-0 group-hover:scale-100 '>
                                  <Link
                                    to={`/note/${note._id}/edit`}
                                    type='button'
                                    className='inline-flex items-center justify-center w-8 h-8 mr-1 text-gray-400 bg-transparent bg-gray-100 rounded-full hover:text-gray-500 focus:outline-none '>
                                    <PencilIcon
                                      className='w-5 h-5 text-gray-400 rounded hover:bg-gray-800 hover:text-gray-100'
                                      aria-hidden='true'
                                    />
                                  </Link>
                                  <Link
                                    to={`/note/${note._id}/delete`}
                                    type='button'
                                    className='inline-flex items-center justify-center w-8 h-8 text-gray-400 bg-transparent bg-gray-100 rounded-full hover:text-gray-500 focus:outline-none '>
                                    <TrashIcon
                                      className='w-5 h-5 text-gray-400 rounded hover:bg-red-600 hover:text-gray-100'
                                      aria-hidden='true'
                                    />
                                  </Link>
                                </div>
                              </div>
                            </li>
                          </div>
                        </div>
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
