/** @format */

import React, { useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../navbar/Sidebar";
import Loader from "../Loader";
import Button from "../Button";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  HomeIcon,
} from "@heroicons/react/outline";
import algoliasearch from "algoliasearch";
import { InstantSearch, SearchBox, Hits, Index } from "react-instantsearch-dom";
import { useNotesQuery } from "../../hooks/useNotes";
import { usePasswordsQuery } from "../../hooks/usePasswords";
import useDesktopSidebarState from "../../hooks/useDesktopSidebarState";
import {
  AppBackdrop,
  AppPanel,
  AppSectionHeader,
  appActionButtonStyle,
  appPageStyle,
  appSearchFieldStyle,
  appTopBarStyle,
} from "../app/appTheme";
import PasswordCard from "../content/PasswordCard";
import NoteCard from "../content/NoteCard";

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
        .catch((indexError) =>
          console.error("Error indexing passwords:", indexError)
        );
    }
  }, [passwords]);

  useEffect(() => {
    if (notes.length > 0) {
      noteIndex
        .saveObjects(notes)
        .catch((indexError) => console.error("Error indexing notes:", indexError));
    }
  }, [notes]);

  if (loading) {
    return (
      <div className='relative flex h-screen overflow-hidden' style={appPageStyle}>
        <AppBackdrop />
        <div className='relative z-10 flex flex-1 items-center justify-center px-4'>
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='relative flex h-screen overflow-hidden' style={appPageStyle}>
        <AppBackdrop />
        <div className='relative z-10 flex flex-1 items-center justify-center px-4'>
          <AppPanel className='max-w-xl px-6 py-8 sm:px-8'>
            <AppSectionHeader
              eyebrow='Load Error'
              title='Search is unavailable'
              description={error.message}
            />
          </AppPanel>
        </div>
      </div>
    );
  }

  return (
    <div className='relative flex h-screen overflow-hidden' style={appPageStyle}>
      <AppBackdrop />
      <div className='relative z-10 flex flex-1 overflow-hidden'>
        <Sidebar isCollapsed={isSidebarCollapsed} />
        <div className='flex min-w-0 flex-1 flex-col overflow-hidden'>
          <InstantSearch indexName='passwordDemo' searchClient={searchClient}>
            <div className='px-4 pt-4 sm:px-6 lg:px-8'>
              <div
                className='rounded-[1.85rem] bg-white/70 px-3 py-3 ring-1 ring-white/70'
                style={appTopBarStyle}>
                <div className='flex flex-col gap-3 lg:flex-row lg:items-center'>
                  <div className='flex items-center gap-3'>
                    <button
                      type='button'
                      className='hidden h-11 w-11 items-center justify-center rounded-[1rem] bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-300 md:inline-flex'
                      style={appActionButtonStyle}
                      onClick={() =>
                        setSidebarCollapsed((current) => !current)
                      }>
                      <span className='sr-only'>
                        {isSidebarCollapsed
                          ? "Expand sidebar"
                          : "Collapse sidebar"}
                      </span>
                      {isSidebarCollapsed ? (
                        <ChevronDoubleRightIcon
                          className='h-5 w-5'
                          aria-hidden='true'
                        />
                      ) : (
                        <ChevronDoubleLeftIcon
                          className='h-5 w-5'
                          aria-hidden='true'
                        />
                      )}
                    </button>
                    <Link
                      to='/'
                      className='inline-flex h-11 items-center justify-center gap-2 rounded-[1rem] bg-white px-4 text-sm font-semibold text-slate-700 transition duration-200 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-amber-300'
                      style={appActionButtonStyle}>
                      <HomeIcon className='h-5 w-5' aria-hidden='true' />
                      <span>Dashboard</span>
                    </Link>
                  </div>

                  <div className='min-w-0 flex-1'>
                    <p className='mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500'>
                      Search The Vault
                    </p>
                    <div
                      className='rounded-[1.5rem] bg-slate-100/90 px-4 py-2'
                      style={appSearchFieldStyle}>
                      <SearchBox
                        className='vault-search'
                        autoFocus
                        translations={{
                          placeholder:
                            "Search passwords, notes, and domains",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <main className='flex-1 overflow-auto pb-8 pt-6 focus:outline-none'>
              <div className='grid gap-6 px-4 sm:px-6 lg:px-8'>
                <AppPanel className='px-6 py-6 sm:px-8 sm:py-8'>
                  <AppSectionHeader
                    eyebrow='Search Results'
                    title='Passwords'
                    description='Matching credentials appear here as you type.'
                  />
                  <div className='mt-8'>
                    <Index indexName='passwordDemo'>
                      <Hits
                        hitComponent={({ hit }) => (
                          <PasswordCard
                            password={hit}
                            backgroundLocation={location}
                            compact
                          />
                        )}
                      />
                    </Index>
                  </div>
                </AppPanel>

                <AppPanel className='px-6 py-6 sm:px-8 sm:py-8'>
                  <AppSectionHeader
                    eyebrow='Search Results'
                    title='Notes'
                    description='Matching secure notes appear here as you type.'
                  />
                  <div className='mt-8'>
                    <Index indexName='noteDemo'>
                      <Hits
                        hitComponent={({ hit }) => (
                          <NoteCard
                            note={hit}
                            backgroundLocation={location}
                            compact
                          />
                        )}
                      />
                    </Index>
                  </div>
                </AppPanel>
              </div>
            </main>
          </InstantSearch>
          <Button />
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;
