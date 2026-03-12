/** @format */

import React, { useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../navbar/Sidebar";
import Loader from "../Loader";

import {
  TrashIcon,
  PencilIcon,
  ChevronDoubleUpIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ArrowNarrowLeftIcon,
} from "@heroicons/react/outline";
import algoliasearch from "algoliasearch";
import { InstantSearch, SearchBox, Hits, Index } from "react-instantsearch-dom";
import Title from "../misc/Title";
import SiteLogo from "../misc/SiteLogo";
import { useNotesQuery } from "../../hooks/useNotes";
import { usePasswordsQuery } from "../../hooks/usePasswords";
import useDesktopSidebarState from "../../hooks/useDesktopSidebarState";

const searchClient = algoliasearch(
  "BC38Z1AKHU",
  "802e2ce9797af17219da6526ac4502ba"
);
const passwordIndex = searchClient.initIndex("passwordDemo");
const noteIndex = searchClient.initIndex("noteDemo");

const SearchScreen = () => {
  const location = useLocation();
  const [isSidebarCollapsed, setSidebarCollapsed] = useDesktopSidebarState();
  const {
    data: passwordResults = [],
    isLoading: passwordsLoading,
    error: passwordsError,
  } = usePasswordsQuery();
  const {
    data: noteResults = [],
    isLoading: notesLoading,
    error: notesError,
  } = useNotesQuery();

  const passwords = useMemo(
    () =>
      passwordResults.map((password) => ({
        ...password,
        objectID: password._id,
      })),
    [passwordResults]
  );
  const notes = useMemo(
    () =>
      noteResults.map((note) => ({
        ...note,
        objectID: note._id,
      })),
    [noteResults]
  );
  const loading = passwordsLoading || notesLoading;
  const error = passwordsError || notesError;

  useEffect(() => {
    if (passwords.length > 0) {
      passwordIndex
        .saveObjects(passwords)
        .then(() => console.log("Passwords indexed successfully"))
        .catch((err) => console.error("Error indexing passwords: ", err));
    }
  }, [passwords]);

  useEffect(() => {
    if (notes.length > 0) {
      noteIndex
        .saveObjects(notes)
        .then(() => console.log("Notes indexed successfully"))
        .catch((err) => console.error("Error indexing notes: ", err));
    }
  }, [notes]);

  //Replace all objects in the index - Slow method at scale
  // useEffect(() => {
  //   if (passwords.length > 0) {
  //     passwordIndex
  //       .replaceAllObjects(passwords)
  //       .then(() => console.log("Passwords re-indexed successfully"))
  //       .catch((err) => console.error("Error re-indexing passwords: ", err));
  //   }
  // }, [passwords]);

  // useEffect(() => {
  //   if (notes.length > 0) {
  //     noteIndex
  //       .replaceAllObjects(notes)
  //       .then(() => console.log("Notes re-indexed successfully"))
  //       .catch((err) => console.error("Error re-indexing notes: ", err));
  //   }
  // }, [notes]);
  if (loading)
    return (
      <main className='relative flex-1 overflow-y-auto focus:outline-none'>
        <div className='py-6'>
          <div className='px-4 mx-auto max-w-7xl sm:px-6 md:px-8'>
            <Loader />
          </div>
        </div>
      </main>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='relative flex flex-1 h-screen overflow-hidden bg-gray-100'>
      <Sidebar isCollapsed={isSidebarCollapsed} />
      <div className='flex flex-col flex-1 w-0 overflow-auto'>
        <InstantSearch indexName='passwordDemo' searchClient={searchClient}>
          <div className='app'>
            <div className=''>
              <div className='flex'>
                <button
                  type='button'
                  className='items-center hidden px-4 text-gray-500 transition duration-200 ease-in transform border-r border-gray-200 shadow-lg focus:shadow-inner focus:outline-none md:inline-flex'
                  onClick={() => setSidebarCollapsed((current) => !current)}>
                  <span className='sr-only'>
                    {isSidebarCollapsed
                      ? "Expand sidebar"
                      : "Collapse sidebar"}
                  </span>
                  {isSidebarCollapsed ? (
                    <ChevronDoubleRightIcon
                      className='w-6 h-6'
                      aria-hidden='true'
                    />
                  ) : (
                    <ChevronDoubleLeftIcon
                      className='w-6 h-6'
                      aria-hidden='true'
                    />
                  )}
                </button>
                <Link
                  to='/'
                  className='inline-flex items-center px-4 text-gray-500 transition duration-200 ease-in transform border-r border-gray-200 shadow-lg focus:shadow-inner rounded-l-md focus:outline-none md:hidden'>
                  <ArrowNarrowLeftIcon
                    className='items-center w-6 h-6'
                    aria-hidden='true'
                  />
                </Link>
                <SearchBox
                  className='w-full '
                  autoFocus
                  translations={{
                    placeholder: "Search Everything",
                  }}
                />
              </div>
              <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
                <div className='max-w-5xl mx-auto'>
                  <Title title='Passwords' />
                  <Index indexName='passwordDemo'>
                    <Hits
                      hitComponent={(props) => (
                        <AllPasswords
                          {...props}
                          backgroundLocation={location}
                        />
                      )}
                    />
                  </Index>
                  <Title title='Notes' />
                  <Index indexName='noteDemo'>
                    <Hits
                      hitComponent={(props) => (
                        <AllNotes
                          {...props}
                          backgroundLocation={location}
                        />
                      )}
                    />
                  </Index>
                </div>
              </div>
            </div>
          </div>
        </InstantSearch>
      </div>
    </div>
  );
};

function AllPasswords({ hit, backgroundLocation }) {
  return (
    <ul className='grid grid-cols-1 gap-5 mt-3 mb-3 overflow-auto sm:gap-6'>
      <li className='group relative flex col-span-1 rounded-md border-r-4 border-transparent shadow-sm transition hover:border-yellow-400'>
        <SiteLogo
          url={hit.url}
          className='flex items-center flex-shrink-0 object-contain text-sm font-medium text-white shadow-sm w-14 rounded-l-md'
        />
        <div className='flex min-w-0 flex-1 flex-row-reverse items-center truncate rounded-r-md border border-gray-200 bg-white'>
          <div className='flex-1 px-4 py-2 pr-12 text-sm truncate'>
            <a
              href={hit.href}
              className='font-medium text-gray-900 hover:text-gray-600'>
              {hit.username}
            </a>
            <p className='text-gray-500 '>{hit.url}</p>
          </div>
        </div>
        <div className='pointer-events-none absolute right-2 top-2 z-10 flex gap-1 opacity-0 translate-y-1 transition-all duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0'>
          <a
            href={`https://${hit.url}`}
            className='card-action-button glass hover:border-sky-200/45 hover:bg-sky-500/70 hover:text-white'>
            <ChevronDoubleUpIcon className='h-5 w-5' aria-hidden='true' />
          </a>
          <Link
            to={`/password/${hit.objectID}/edit`}
            state={{ backgroundLocation }}
            type='button'
            className='card-action-button glass hover:border-slate-200/45 hover:bg-slate-600/70 hover:text-white'>
            <PencilIcon className='h-5 w-5' aria-hidden='true' />
          </Link>
          <Link
            to={`/password/${hit.objectID}/delete`}
            state={{ backgroundLocation }}
            type='button'
            className='card-action-button glass hover:border-red-200/45 hover:bg-red-500/75 hover:text-white'>
            <TrashIcon className='h-5 w-5' aria-hidden='true' />
          </Link>
        </div>
      </li>
    </ul>
  );
}

function AllNotes({ hit, backgroundLocation }) {
  return (
    <ul className='grid grid-cols-1 gap-5 mt-3 mb-3 overflow-auto sm:gap-6'>
      <li className='group relative flex col-span-1 rounded-md border-r-4 border-transparent shadow-sm transition hover:border-yellow-400'>
        <img
          alt='logo'
          src='https://media.publit.io/file/noun-triangle.svg'
          className='flex items-center flex-shrink-0 object-contain text-sm font-medium text-white shadow-sm w-14 rounded-l-md'
        />
        <div className='flex min-w-0 flex-1 flex-row-reverse items-center truncate rounded-r-md border border-blue-200 bg-white'>
          <div className='flex-1 px-4 py-2 pr-12 text-sm truncate'>
            {hit.title}
            <p className='text-gray-500 truncate h-11 '>{hit.caption}</p>
          </div>
        </div>
        <div className='pointer-events-none absolute right-2 top-2 z-10 flex gap-1 opacity-0 translate-y-1 transition-all duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0'>
          <Link
            to={`/note/${hit.objectID}/edit`}
            state={{ backgroundLocation }}
            type='button'
            className='card-action-button glass hover:border-slate-200/45 hover:bg-slate-600/70 hover:text-white'>
            <PencilIcon className='h-5 w-5' aria-hidden='true' />
          </Link>
          <Link
            to={`/note/${hit.objectID}/delete`}
            state={{ backgroundLocation }}
            type='button'
            className='card-action-button glass hover:border-red-200/45 hover:bg-red-500/75 hover:text-white'>
            <TrashIcon className='h-5 w-5' aria-hidden='true' />
          </Link>
        </div>
      </li>
    </ul>
  );
}

export default SearchScreen;
