/** @format */

import React, { useDeferredValue, useMemo, useState } from "react";
import { FingerPrintIcon } from "@heroicons/react/outline";
import { useLocation } from "react-router-dom";
import PasswordState from "../emptyState/passwordState";
import {
  AppClosingAction,
  AppDashedEmptyState,
  AppEmptyState,
  AppLoader,
  AppMetaNote,
  AppPrimaryLink,
} from "../app/appTheme";
import { usePasswordsQuery } from "../../hooks/usePasswords";
import CollectionSection from "./CollectionSection";
import PasswordCard from "./PasswordCard";
import CollectionControls from "./CollectionControls";

const filterOptions = [
  { value: "all", label: "All passwords" },
  { value: "withNotes", label: "With notes" },
  { value: "withoutNotes", label: "Without notes" },
];

const sortOptions = [
  { value: "recent", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "site", label: "Sort by site" },
  { value: "username", label: "Sort by username" },
];

const getTimestamp = (item) => {
  if (item.updatedAt) {
    return new Date(item.updatedAt).getTime();
  }

  if (item.createdAt) {
    return new Date(item.createdAt).getTime();
  }

  return 0;
};

const PasswordContent = ({
  title,
  density = "comfortable",
  showControls = false,
  showAction = true,
  embedded = false,
  maxItems,
  sectionAction,
  showFooterAction,
}) => {
  const location = useLocation();
  const {
    data: passwords = [],
    isLoading,
    error,
  } = usePasswordsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [sortValue, setSortValue] = useState("recent");
  const deferredSearch = useDeferredValue(searchTerm.trim().toLowerCase());
  const compact = density === "compact";
  const shouldShowFooterAction = showFooterAction ?? !embedded;

  const filteredPasswords = useMemo(() => {
    const nextPasswords = [...passwords]
      .filter((password) => {
        if (!showControls) {
          return true;
        }

        const haystack = [
          password.url,
          password.username,
          password.notes,
        ]
          .join(" ")
          .toLowerCase();

        const matchesSearch = deferredSearch
          ? haystack.includes(deferredSearch)
          : true;

        const hasNotes = Boolean(password.notes?.trim());
        const matchesFilter =
          filterValue === "all"
            ? true
            : filterValue === "withNotes"
            ? hasNotes
            : !hasNotes;

        return matchesSearch && matchesFilter;
      })
      .sort((left, right) => {
        switch (sortValue) {
          case "oldest":
            return getTimestamp(left) - getTimestamp(right);
          case "site":
            return left.url.localeCompare(right.url);
          case "username":
            return left.username.localeCompare(right.username);
          case "recent":
          default:
            return getTimestamp(right) - getTimestamp(left);
        }
      });

    return nextPasswords;
  }, [deferredSearch, filterValue, passwords, showControls, sortValue]);

  const action = (
    <AppPrimaryLink
      to='/passwords/add'
      state={{ backgroundLocation: location }}>
      <FingerPrintIcon className='h-5 w-5' aria-hidden='true' />
      Add Password
    </AppPrimaryLink>
  );

  const visiblePasswords =
    typeof maxItems === "number" && maxItems > 0
      ? filteredPasswords.slice(0, maxItems)
      : filteredPasswords;

  const isPreviewTruncated = visiblePasswords.length < filteredPasswords.length;

  const content = (
    <CollectionSection
      eyebrow='Vault Feature'
      title={title}
      description='Store the site, username, and supporting details in a layout that keeps the critical login info easy to scan.'
      count={passwords.length}
      action={sectionAction ?? (showAction ? action : null)}
      footer={
        shouldShowFooterAction && !isLoading && !error && passwords.length > 0 ? (
          <AppClosingAction
            eyebrow='Keep The Vault Current'
            title='Add the next login before you leave this page'
            description='Capture the site, username, and supporting details now so this vault stays complete and searchable.'
            primaryTo='/passwords/add'
            primaryState={{ backgroundLocation: location }}
            primaryIcon={FingerPrintIcon}
            primaryLabel='Add Password'
            secondaryTo='/search'
            secondaryLabel='Search Vault'
          />
        ) : null
      }>
      {isLoading ? (
        <AppLoader label='Loading passwords' />
      ) : error ? (
        <AppEmptyState
          eyebrow='Load Error'
          icon={FingerPrintIcon}
          title='Passwords could not be loaded'
          description={error.message}
        />
      ) : passwords.length === 0 ? (
        <PasswordState />
      ) : (
        <React.Fragment>
          {showControls ? (
            <CollectionControls
              searchValue={searchTerm}
              onSearchChange={setSearchTerm}
              searchPlaceholder='Search sites, usernames, or saved notes'
              filterValue={filterValue}
              onFilterChange={setFilterValue}
              filterOptions={filterOptions}
              sortValue={sortValue}
              onSortChange={setSortValue}
              sortOptions={sortOptions}
              summary={`Showing ${filteredPasswords.length} of ${passwords.length}`}
            />
          ) : null}

          <AppMetaNote className={showControls ? "mt-3" : null}>
            Site logos use logo.dev when available. If a logo is missing, the
            vault falls back to the site initial.
          </AppMetaNote>
          {isPreviewTruncated ? (
            <AppMetaNote className='mt-2'>
              Showing the latest {visiblePasswords.length} entries here. Open
              the passwords view for the full collection.
            </AppMetaNote>
          ) : null}

          {filteredPasswords.length === 0 ? (
            <AppDashedEmptyState
              icon={FingerPrintIcon}
              title='No passwords match the current view'
              description='Try clearing the search, changing the filter, or switching to a broader sort to bring more entries back into view.'
              className='mt-6'
            />
          ) : (
            <ul
              className={`mt-6 grid grid-cols-1 ${
                compact
                  ? "gap-3 xl:grid-cols-2 2xl:grid-cols-3"
                  : "gap-5 lg:grid-cols-2 2xl:grid-cols-3"
              }`}>
              {visiblePasswords.map((password) => (
                <li key={password._id}>
                  <PasswordCard
                    password={password}
                    backgroundLocation={location}
                    compact={compact}
                  />
                </li>
              ))}
            </ul>
          )}
        </React.Fragment>
      )}
    </CollectionSection>
  );

  if (embedded) {
    return <div className='relative'>{content}</div>;
  }

  return (
    <main className='relative flex-1 overflow-auto pb-8 pt-6 focus:outline-none'>
      {content}
    </main>
  );
};

export default PasswordContent;
