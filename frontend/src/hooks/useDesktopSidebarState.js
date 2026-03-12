/** @format */

import { useEffect, useState } from "react";

const STORAGE_KEY = "passman.desktopSidebarCollapsed";

const getInitialValue = () => {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
};

const useDesktopSidebarState = () => {
  const [isCollapsed, setIsCollapsed] = useState(getInitialValue);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(isCollapsed));
    } catch {
      // Ignore storage failures and keep the current in-memory state.
    }
  }, [isCollapsed]);

  return [isCollapsed, setIsCollapsed];
};

export default useDesktopSidebarState;
