/** @format */
/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../navbar/Sidebar";
import Loader from "../Loader";

import {
  TrashIcon,
  PencilIcon,
  ChevronDoubleUpIcon,
  ArrowNarrowLeftIcon,
} from "@heroicons/react/outline";
import algoliasearch from "algoliasearch";
import { InstantSearch, SearchBox, Hits, Index } from "react-instantsearch-dom";
import axios from "axios";
import Title from "../misc/Title";

const searchClient = algoliasearch(
  "BC38Z1AKHU",
  "802e2ce9797af17219da6526ac4502ba"
);
const passwordIndex = searchClient.initIndex("passwordDemo");
const noteIndex = searchClient.initIndex("noteDemo");

const SearchScreen = () => {
  const [passwords, setPasswords] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const [passwordResponse, noteResponse] = await Promise.all([
          axios.get("/api/passwords"),
          axios.get("/api/notes"),
        ]);
        const passwordData = passwordResponse.data.map((password) => {
          return { ...password, objectID: password._id };
        });
        const noteData = noteResponse.data.map((note) => {
          return { ...note, objectID: note._id };
        });
        setPasswords(passwordData);
        setNotes(noteData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data: ", err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='relative flex flex-1 h-screen overflow-hidden bg-gray-100'>
      <Sidebar />
      <div className='flex flex-col flex-1 w-0 overflow-auto'>
        <InstantSearch indexName='passwordDemo' searchClient={searchClient}>
          <div className='app'>
            <div className=''>
              <div className='flex'>
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
                    <Hits hitComponent={allPasswords} />
                  </Index>
                  <Title title='Notes' />
                  <Index indexName='noteDemo'>
                    <Hits hitComponent={allNotes} />
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

function allPasswords({ hit }) {
  return (
    <ul className='grid grid-cols-1 gap-5 mt-3 mb-3 overflow-auto sm:gap-6 group'>
      <div className='border-r-4 rounded-md hover:border-yellow-400'>
        <li className='flex col-span-1 rounded-md shadow-sm'>
          <img
            alt='logo '
            src={`https://img.logo.dev/${hit.url}?token=pk_H82lg8wdSsOq6I1XLEFkyg`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://media.publit.io/file/MiscPasswordIcon.svg";
            }}
            className='flex items-center flex-shrink-0 object-contain text-sm font-medium text-white shadow-sm w-14 rounded-l-md'
          />
          <div className='flex flex-row-reverse items-center flex-1 truncate bg-white border-t border-b border-r border-gray-200 rounded-r-md'>
            <div className='flex-1 px-4 py-2 text-sm truncate'>
              <a
                href={hit.href}
                className='font-medium text-gray-900 hover:text-gray-600'>
                {hit.username}
              </a>
              <p className='text-gray-500 '>{hit.url}</p>
            </div>
            <div className='absolute flex-shrink-0 m-2 transform scale-0 group-hover:scale-100 '>
              <a
                href={`https://${hit.url}`}
                className='inline-flex items-center justify-center w-8 h-8 mr-1 text-gray-400 bg-transparent bg-gray-100 rounded-full hover:text-gray-500 focus:outline-none '>
                <ChevronDoubleUpIcon
                  className='w-5 h-5 text-gray-400 rounded hover:bg-blue-700 hover:text-gray-100'
                  aria-hidden='true'
                />
              </a>
              <Link
                to={`/password/${hit.objectID}/edit`}
                type='button'
                className='inline-flex items-center justify-center w-8 h-8 mr-1 text-gray-400 bg-transparent bg-gray-100 rounded-full hover:text-gray-500 focus:outline-none '>
                <PencilIcon
                  className='w-5 h-5 text-gray-400 rounded hover:bg-gray-800 hover:text-gray-100'
                  aria-hidden='true'
                />
              </Link>
              <Link
                to={`/password/${hit.objectID}/delete`}
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
    </ul>
  );
}

function allNotes({ hit }) {
  return (
    <ul className='grid grid-cols-1 gap-5 mt-3 mb-3 overflow-auto sm:gap-6 group'>
      <div className='border-r-4 rounded-md hover:border-yellow-400'>
        <li className='flex col-span-1 border-4 rounded-md shadow-sm border-gray-50'>
          <img
            alt='logo'
            src='https://media.publit.io/file/noun-triangle.svg'
            className='flex items-center flex-shrink-0 object-contain text-sm font-medium text-white shadow-sm w-14 rounded-l-md'
          />
          <div className='flex flex-row-reverse items-center flex-1 truncate bg-white border-t border-b border-r border-blue-200 rounded-r-md'>
            <div className='flex-1 px-4 py-2 text-sm truncate'>
              {hit.title}
              <p className='text-gray-500 truncate h-11 '>{hit.caption}</p>
            </div>
            <div className='absolute flex-shrink-0 m-2 transform scale-0 group-hover:scale-100 '>
              <Link
                to={`/note/${hit.objectID}/edit`}
                type='button'
                className='inline-flex items-center justify-center w-8 h-8 mr-1 text-gray-400 bg-transparent bg-gray-100 rounded-full hover:text-gray-500 focus:outline-none '>
                <PencilIcon
                  className='w-5 h-5 text-gray-400 rounded hover:bg-gray-800 hover:text-gray-100'
                  aria-hidden='true'
                />
              </Link>
              <Link
                to={`/note/${hit.objectID}/delete`}
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
    </ul>
  );
}

export default SearchScreen;
