/** @format */

import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../navbar/Sidebar";
import Loader from "../Loader";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  DocumentTextIcon,
  FingerPrintIcon,
  HomeIcon,
  PaperClipIcon,
} from "@heroicons/react/outline";
import algoliasearch from "algoliasearch";
import {
  InstantSearch,
  SearchBox,
  Index,
  connectHits,
} from "react-instantsearch-dom";
import { useNotesQuery } from "../../hooks/useNotes";
import { usePasswordsQuery } from "../../hooks/usePasswords";
import useDesktopSidebarState from "../../hooks/useDesktopSidebarState";
import {
  AppBackdrop,
  AppClosingAction,
  AppDashedEmptyState,
  AppMetaNote,
  AppPanel,
  AppSectionHeader,
  appActionButtonStyle,
  appPageStyle,
  appSearchFieldStyle,
  appTopBarStyle,
} from "../app/appTheme";
import DensityToggle from "../app/DensityToggle";
import PasswordCard from "../content/PasswordCard";
import NoteCard from "../content/NoteCard";

const searchClient = algoliasearch(
  "BC38Z1AKHU",
  "802e2ce9797af17219da6526ac4502ba"
);
const passwordIndex = searchClient.initIndex("passwordDemo");
const noteIndex = searchClient.initIndex("noteDemo");

const SearchHits = connectHits(({ hits, renderHit, emptyState }) => {
  if (!hits.length) {
    return emptyState;
  }

  return (
    <ul className='grid min-w-0 gap-5'>
      {hits.map((hit) => (
        <li key={hit.objectID || hit._id} className='m-0 min-w-0 list-none'>
          {renderHit(hit)}
        </li>
      ))}
    </ul>
  );
});

const SearchScreen = () => {
  const location = useLocation();
  const [isSidebarCollapsed, setSidebarCollapsed] = useDesktopSidebarState();
  const [density, setDensity] = useState("compact");
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
                <div className='flex flex-wrap items-center gap-3 2xl:flex-nowrap'>
                  <div className='order-1 flex w-full flex-wrap items-center gap-3 sm:w-auto'>
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
                      className='inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-[1rem] bg-white px-4 text-sm font-semibold text-slate-700 transition duration-200 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-amber-300 sm:flex-none'
                      style={appActionButtonStyle}>
                      <HomeIcon className='h-5 w-5' aria-hidden='true' />
                      <span className='truncate'>Dashboard</span>
                    </Link>
                    <DensityToggle
                      density={density}
                      onChange={setDensity}
                      className='ml-auto flex-shrink-0 sm:ml-0'
                    />
                  </div>

                  <div className='order-2 min-w-0 basis-full self-center 2xl:flex-1'>
                    <div
                      className='rounded-[1.5rem] bg-slate-100/90 px-4 py-2.5'
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
              <div className='grid min-w-0 gap-6 px-4 sm:px-6 lg:px-8'>
                <AppPanel className='px-6 py-6 sm:px-8 sm:py-8'>
                  <AppSectionHeader
                    eyebrow='Search Results'
                    title='Passwords'
                    description='Matching credentials appear here as you type.'
                  />
                  <AppMetaNote className='mt-4'>
                    Site logos use logo.dev when available. If a logo is
                    missing, the vault falls back to the site initial.
                  </AppMetaNote>
                  <div className='mt-8'>
                    <Index indexName='passwordDemo'>
                      <SearchHits
                        emptyState={
                          <AppDashedEmptyState
                            icon={FingerPrintIcon}
                            title='No passwords match this search'
                            description='Try another domain, username, or broader keyword to surface more saved credentials.'
                          />
                        }
                        renderHit={(hit) => (
                          <PasswordCard
                            password={hit}
                            backgroundLocation={location}
                            compact={density === "compact"}
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
                      <SearchHits
                        emptyState={
                          <AppDashedEmptyState
                            icon={DocumentTextIcon}
                            title='No notes match this search'
                            description='Try another keyword or broaden the query to bring matching secure notes back into view.'
                          />
                        }
                        renderHit={(hit) => (
                          <NoteCard
                            note={hit}
                            backgroundLocation={location}
                            compact={density === "compact"}
                          />
                        )}
                      />
                    </Index>
                  </div>
                </AppPanel>

                <AppPanel className='px-6 py-6 sm:px-8 sm:py-8'>
                  <AppClosingAction
                    eyebrow='Keep The Vault Current'
                    title='Did not find the item you expected? Save it now.'
                    description='If a password or secure note is missing from these results, add it directly so the next search finds it immediately.'
                    primaryTo='/passwords/add'
                    primaryState={{ backgroundLocation: location }}
                    primaryIcon={FingerPrintIcon}
                    primaryLabel='Add Password'
                    secondaryTo='/add/note'
                    secondaryState={{ backgroundLocation: location }}
                    secondaryIcon={PaperClipIcon}
                    secondaryLabel='Add Note'
                  />
                </AppPanel>
              </div>
            </main>
          </InstantSearch>
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;
