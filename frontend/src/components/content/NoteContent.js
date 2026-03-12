/** @format */

import React, { useDeferredValue, useMemo, useState } from "react";
import { PaperClipIcon } from "@heroicons/react/outline";
import { useLocation } from "react-router-dom";
import NoteState from "../emptyState/noteState";
import {
  AppDashedEmptyState,
  AppEmptyState,
  AppLoader,
  AppPrimaryLink,
} from "../app/appTheme";
import { useNotesQuery } from "../../hooks/useNotes";
import CollectionSection from "./CollectionSection";
import NoteCard from "./NoteCard";
import CollectionControls from "./CollectionControls";

const filterOptions = [
  { value: "all", label: "All notes" },
  { value: "withBody", label: "With body text" },
  { value: "titleOnly", label: "Title only" },
];

const sortOptions = [
  { value: "recent", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "title", label: "Sort by title" },
  { value: "length", label: "Longest first" },
];

const getObjectIdTimestamp = (value) => {
  if (!value || typeof value !== "string" || value.length < 8) {
    return 0;
  }

  const timestampHex = value.slice(0, 8);
  const timestamp = parseInt(timestampHex, 16);

  return Number.isFinite(timestamp) ? timestamp * 1000 : 0;
};

const getTimestamp = (item) => {
  if (item.updatedAt) {
    return new Date(item.updatedAt).getTime();
  }

  if (item.createdAt) {
    return new Date(item.createdAt).getTime();
  }

  return getObjectIdTimestamp(item._id || item.objectID);
};

const NoteContent = ({
  title,
  density = "comfortable",
  showControls = false,
}) => {
  const location = useLocation();
  const { data: notes = [], isLoading, error } = useNotesQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [sortValue, setSortValue] = useState("recent");
  const deferredSearch = useDeferredValue(searchTerm.trim().toLowerCase());
  const compact = density === "compact";

  const filteredNotes = useMemo(() => {
    const nextNotes = [...notes]
      .filter((note) => {
        if (!showControls) {
          return true;
        }

        const haystack = [note.title, note.caption].join(" ").toLowerCase();
        const matchesSearch = deferredSearch
          ? haystack.includes(deferredSearch)
          : true;
        const hasBody = Boolean(note.caption?.trim());
        const matchesFilter =
          filterValue === "all"
            ? true
            : filterValue === "withBody"
            ? hasBody
            : !hasBody;

        return matchesSearch && matchesFilter;
      })
      .sort((left, right) => {
        switch (sortValue) {
          case "oldest":
            return getTimestamp(left) - getTimestamp(right);
          case "title":
            return left.title.localeCompare(right.title);
          case "length":
            return (right.caption?.length || 0) - (left.caption?.length || 0);
          case "recent":
          default:
            return getTimestamp(right) - getTimestamp(left);
        }
      });

    return nextNotes;
  }, [deferredSearch, filterValue, notes, showControls, sortValue]);

  const action = (
    <AppPrimaryLink to='/add/note' state={{ backgroundLocation: location }}>
      <PaperClipIcon className='h-5 w-5' aria-hidden='true' />
      Add Note
    </AppPrimaryLink>
  );

  return (
    <main className='relative flex-1 overflow-auto pb-8 pt-6 focus:outline-none'>
      <CollectionSection
        eyebrow='Vault Feature'
        title={title}
        description='Keep secure instructions and reference text readable at a glance, with clear titles and a quick preview of the note body.'
        count={notes.length}
        action={action}>
        {isLoading ? (
          <AppLoader label='Loading notes' />
        ) : error ? (
          <AppEmptyState
            eyebrow='Load Error'
            icon={PaperClipIcon}
            title='Notes could not be loaded'
            description={error.message}
          />
        ) : notes.length === 0 ? (
          <NoteState />
        ) : (
          <React.Fragment>
            {showControls ? (
              <CollectionControls
                searchValue={searchTerm}
                onSearchChange={setSearchTerm}
                searchPlaceholder='Search note titles or body text'
                filterValue={filterValue}
                onFilterChange={setFilterValue}
                filterOptions={filterOptions}
                sortValue={sortValue}
                onSortChange={setSortValue}
                sortOptions={sortOptions}
                summary={`Showing ${filteredNotes.length} of ${notes.length}`}
              />
            ) : null}

            {filteredNotes.length === 0 ? (
              <AppDashedEmptyState
                icon={PaperClipIcon}
                title='No notes match the current view'
                description='Try clearing the search, changing the filter, or switching to a broader sort to bring more notes back into view.'
                className='mt-6'
              />
            ) : (
              <ul
                className={`mt-6 grid grid-cols-1 ${
                  compact
                    ? "gap-3 xl:grid-cols-2 2xl:grid-cols-3"
                    : "gap-5 lg:grid-cols-2 2xl:grid-cols-3"
                }`}>
                {filteredNotes.map((note) => (
                  <li key={note._id}>
                    <NoteCard
                      note={note}
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
    </main>
  );
};

export default NoteContent;
