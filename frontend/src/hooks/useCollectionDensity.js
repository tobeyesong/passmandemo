/** @format */

import { useEffect, useState } from "react";

const getInitialValue = (storageKey, defaultValue) => {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  try {
    const stored = window.localStorage.getItem(storageKey);
    return stored === "comfortable" || stored === "compact"
      ? stored
      : defaultValue;
  } catch {
    return defaultValue;
  }
};

const useCollectionDensity = (
  storageKey = "passman.collectionDensity",
  defaultValue = "comfortable"
) => {
  const [density, setDensity] = useState(() =>
    getInitialValue(storageKey, defaultValue)
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, density);
    } catch {
      // Ignore storage failures and keep the in-memory preference.
    }
  }, [density, storageKey]);

  return [density, setDensity];
};

export default useCollectionDensity;
