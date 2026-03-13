/** @format */

import React from "react";
import { FingerPrintIcon } from "@heroicons/react/outline";
import { useLocation } from "react-router-dom";
import { AppEmptyState } from "../app/appTheme";

const PasswordState = () => {
  const location = useLocation();

  return (
    <AppEmptyState
      eyebrow='Fresh Vault'
      icon={FingerPrintIcon}
      title='No passwords yet'
      description='Start with the accounts you use most often. Once the first credential is in place, the rest of the vault becomes much easier to organize.'
      actionTo='/passwords/add'
      actionState={{ backgroundLocation: location }}
      actionIcon={FingerPrintIcon}
      actionLabel='Add Password'
    />
  );
};

export default PasswordState;
