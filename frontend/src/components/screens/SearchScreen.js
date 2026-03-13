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
  appInsetStyle,
  appPageStyle,
  appSearchFieldStyle,
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
            <main className='flex-1 overflow-auto pb-8 pt-6 focus:outline-none'>
              <div className='grid min-w-0 gap-6 px-4 sm:px-6 lg:px-8'>
                <AppPanel className='px-6 py-6 sm:px-8 sm:py-8'>
                  <div className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
                      <div className='min-w-0 max-w-2xl'>
                        <p className='text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-700'>
                          Search The Vault
                        </p>
                        <h1 className='mt-3 text-3xl font-semibold tracking-tight text-slate-950'>
                          Find passwords first, with notes right behind them.
                        </h1>
                        <p className='mt-3 text-sm leading-6 text-slate-600'>
                          Search passwords, notes, and domains from one place,
                          then act on the matching credential without leaving
                          the page.
                        </p>
                      </div>

                      <div className='flex flex-wrap items-center gap-2 lg:flex-shrink-0 lg:justify-end'>
                        <button
                          type='button'
                          className='hidden h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-300 md:inline-flex'
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
                          className='inline-flex h-10 min-w-0 items-center justify-center gap-2 rounded-full bg-slate-100/90 px-4 text-sm font-medium text-slate-600 transition duration-200 hover:bg-white hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-amber-300'
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
                    </div>

                    <div
                      className='rounded-[1.75rem] bg-slate-100/90 px-4 py-3'
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

                    <div
                      className='flex flex-wrap items-center gap-3 rounded-[1.5rem] bg-slate-50/90 px-4 py-3 text-sm text-slate-600'
                      style={appInsetStyle}>
                      <span className='inline-flex items-center rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500'>
                        Primary Results
                      </span>
                      <span className='leading-6'>
                        Matching credentials appear first so the fastest path
                        back into an account stays front and center.
                      </span>
                    </div>
                  </div>

                  <div className='mt-8 border-t border-slate-200/80 pt-8'>
                    <AppSectionHeader
                      eyebrow='Passwords'
                      title='Matching Credentials'
                      description='Open, edit, or delete the most relevant credential directly from the results below.'
                    />
                    <AppMetaNote className='mt-4'>
                      Site logos use logo.dev when available. If a logo is
                      missing, the vault falls back to the site initial.
                    </AppMetaNote>
                  </div>

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

                <AppPanel className='bg-slate-50/70 px-6 py-6 ring-slate-200/60 sm:px-8 sm:py-8'>
                  <AppSectionHeader
                    eyebrow='Supporting Results'
                    title='Notes'
                    description='Matching secure notes follow the credential results so related instructions stay nearby without competing for attention.'
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
