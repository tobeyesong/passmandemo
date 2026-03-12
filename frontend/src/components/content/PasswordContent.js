/** @format */

import React from "react";
import { FingerPrintIcon } from "@heroicons/react/outline";
import { useLocation } from "react-router-dom";
import PasswordState from "../emptyState/passwordState";
import { AppEmptyState, AppLoader, AppPrimaryLink } from "../app/appTheme";
import { usePasswordsQuery } from "../../hooks/usePasswords";
import CollectionSection from "./CollectionSection";
import PasswordCard from "./PasswordCard";

const PasswordContent = ({ title, variant = "showcase" }) => {
  const location = useLocation();
  const {
    data: passwords = [],
    isLoading,
    error,
  } = usePasswordsQuery();

  const isDense = variant === "dense";
  const action = (
    <AppPrimaryLink
      to='/passwords/add'
      state={{ backgroundLocation: location }}>
      <FingerPrintIcon className='h-5 w-5' aria-hidden='true' />
      Add Password
    </AppPrimaryLink>
  );

  return (
    <main className='relative flex-1 overflow-auto pb-8 pt-6 focus:outline-none'>
      <CollectionSection
        eyebrow='Vault Feature'
        title={title}
        description='Store the site, username, and supporting details in a layout that keeps the critical login info easy to scan.'
        count={passwords.length}
        action={action}>
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
          <ul
            className={`grid grid-cols-1 gap-4 ${
              isDense
                ? "xl:grid-cols-2 2xl:grid-cols-3"
                : "lg:grid-cols-2 2xl:grid-cols-3"
            }`}>
            {passwords.map((password) => (
              <li key={password._id}>
                <PasswordCard
                  password={password}
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

export default PasswordContent;
