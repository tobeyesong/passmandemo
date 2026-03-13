/** @format */

import React from "react";
import { useLocation } from "react-router-dom";
import {
  FingerPrintIcon,
  PaperClipIcon,
} from "@heroicons/react/outline";
import Sidebar from "../navbar/Sidebar";
import SearchBar from "../navbar/SearchBar";
import PasswordContent from "../content/PasswordContent";
import NoteContent from "../content/NoteContent";
import useDesktopSidebarState from "../../hooks/useDesktopSidebarState";
import useCollectionDensity from "../../hooks/useCollectionDensity";
import { usePasswordsQuery } from "../../hooks/usePasswords";
import { useNotesQuery } from "../../hooks/useNotes";
import {
  AppBackdrop,
  AppPrimaryLink,
  AppSecondaryLink,
  appPageStyle,
} from "../app/appTheme";

const DashboardScreen = () => {
  const location = useLocation();
  const [isSidebarCollapsed, setSidebarCollapsed] = useDesktopSidebarState();
  const [density, setDensity] = useCollectionDensity(
    "passman.dashboardDensity",
    "comfortable"
  );
  const { data: passwords = [], isLoading: passwordsLoading } =
    usePasswordsQuery();
  const { data: notes = [], isLoading: notesLoading } = useNotesQuery();
  const previewLimit = density === "compact" ? 6 : 4;

  const heroHighlights = [
    {
      label: "Passwords",
      value: passwordsLoading ? "Loading" : `${passwords.length} saved`,
      icon: FingerPrintIcon,
    },
    {
      label: "Notes",
      value: notesLoading ? "Loading" : `${notes.length} saved`,
      icon: PaperClipIcon,
    },
  ];

  return (
    <div className='relative flex h-screen overflow-hidden' style={appPageStyle}>
      <AppBackdrop />
      <div className='relative z-10 flex flex-1 overflow-hidden'>
        <Sidebar isCollapsed={isSidebarCollapsed} />
        <main className='min-w-0 flex-1 overflow-y-auto overflow-x-hidden pb-10'>
          <div className='px-4 pt-4 sm:px-6 lg:px-8'>
            <section className='relative overflow-hidden rounded-[2.6rem] bg-[linear-gradient(135deg,#0f3c8c_0%,#0d56b5_52%,#1b78d9_100%)] px-6 pb-28 pt-6 text-white shadow-[0_24px_70px_rgba(15,60,140,0.28)] sm:px-8 sm:pb-32 sm:pt-7'>
              <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.12),transparent_26%)]' />
              <div className='pointer-events-none absolute inset-x-6 top-[5.7rem] h-px bg-white/[0.14] sm:inset-x-8 sm:top-[6.4rem]' />

              <SearchBar
                hero
                isSidebarCollapsed={isSidebarCollapsed}
                onSidebarToggle={() =>
                  setSidebarCollapsed((current) => !current)
                }
                density={density}
                onDensityChange={setDensity}
              />

              <div className='relative mt-12 max-w-4xl sm:mt-16'>
                <p className='text-[11px] font-semibold uppercase tracking-[0.34em] text-white/60'>
                  Secure Workspace
                </p>
                <h1 className='mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl'>
                  Keep passwords and private notes in one clear vault.
                </h1>
                <p className='mt-4 max-w-2xl text-sm leading-7 text-white/[0.72] sm:text-base'>
                  Store logins, backup codes, and supporting details in one
                  workspace so the next thing you need is easy to scan and fast
                  to reopen.
                </p>
                <div className='mt-7 flex flex-wrap gap-3'>
                  <AppPrimaryLink
                    to='/passwords/add'
                    state={{ backgroundLocation: location }}>
                    <FingerPrintIcon className='h-5 w-5' aria-hidden='true' />
                    Add Password
                  </AppPrimaryLink>
                  <AppSecondaryLink to='/notes' tone='hero'>
                    <PaperClipIcon className='h-5 w-5' aria-hidden='true' />
                    Review Notes
                  </AppSecondaryLink>
                </div>
                <p className='mt-4 max-w-2xl text-sm leading-6 text-white/[0.62]'>
                  Start with a login, then keep the recovery steps and backup
                  codes that belong with it nearby in notes.
                </p>
                <div className='mt-7 flex flex-wrap gap-3'>
                  {heroHighlights.map((item) => (
                    <div
                      key={item.label}
                      className='inline-flex min-w-[13rem] items-center gap-3 rounded-full bg-white/10 px-4 py-3 ring-1 ring-white/[0.12]'>
                      <span className='flex h-10 w-10 items-center justify-center rounded-full bg-white/12 text-white'>
                        <item.icon className='h-5 w-5' aria-hidden='true' />
                      </span>
                      <span className='min-w-0'>
                        <span className='block text-[10px] font-semibold uppercase tracking-[0.28em] text-white/56'>
                          {item.label}
                        </span>
                        <span className='block truncate text-sm font-semibold text-white'>
                          {item.value}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div className='relative z-30 -mt-16 sm:-mt-20 lg:-mt-24'>
            <div
              className='relative'
              style={{
                filter: "drop-shadow(0 28px 64px rgba(15, 23, 42, 0.12))",
              }}>
              <PasswordContent
                title='Recent Passwords'
                density={density}
                embedded
                showAction={false}
                showFooterAction={false}
                maxItems={previewLimit}
                sectionAction={
                  <AppSecondaryLink to='/passwords'>View All</AppSecondaryLink>
                }
              />
            </div>
            <NoteContent
              title='Recent Notes'
              density={density}
              embedded
              showAction={false}
              showFooterAction={false}
              maxItems={previewLimit}
              sectionAction={
                <AppSecondaryLink to='/notes'>View All</AppSecondaryLink>
              }
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardScreen;
