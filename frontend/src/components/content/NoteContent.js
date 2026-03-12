/** @format */

import React from "react";
import { PaperClipIcon } from "@heroicons/react/outline";
import { useLocation } from "react-router-dom";
import NoteState from "../emptyState/noteState";
import { AppEmptyState, AppLoader, AppPrimaryLink } from "../app/appTheme";
import { useNotesQuery } from "../../hooks/useNotes";
import CollectionSection from "./CollectionSection";
import NoteCard from "./NoteCard";

const NoteContent = ({ title, variant = "showcase" }) => {
  const location = useLocation();
  const { data: notes = [], isLoading, error } = useNotesQuery();
  const isDense = variant === "dense";

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
          <ul
            className={`grid grid-cols-1 gap-4 ${
              isDense
                ? "xl:grid-cols-2 2xl:grid-cols-3"
                : "lg:grid-cols-2 2xl:grid-cols-3"
            }`}>
            {notes.map((note) => (
              <li key={note._id}>
                <NoteCard
                  note={note}
                  backgroundLocation={location}
                  compact={isDense}
                />
              </li>
            ))}
          </ul>
        )}
      </CollectionSection>
    </main>
  );
};

export default NoteContent;
