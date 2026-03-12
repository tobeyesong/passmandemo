/** @format */

import React from "react";
import { PaperClipIcon } from "@heroicons/react/outline";
import { useLocation } from "react-router-dom";
import { AppEmptyState } from "../app/appTheme";

const NoteState = () => {
  const location = useLocation();

  return (
    <AppEmptyState
      eyebrow='Fresh Vault'
      icon={PaperClipIcon}
      title='No notes yet'
      description='Use notes for backup codes, secure instructions, or anything you want readable at a glance without opening another tool.'
      actionTo='/add/note'
      actionState={{ backgroundLocation: location }}
      actionIcon={PaperClipIcon}
      actionLabel='Create Note'
    />
  );
};

export default NoteState;
