/** @format */

import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import App from "./App";
import queryClient from "./lib/queryClient";

if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
  const resizeObserverError =
    /ResizeObserver loop (completed with undelivered notifications|limit exceeded)/;
  const isResizeObserverMessage = (value) =>
    typeof value === "string" && resizeObserverError.test(value);

  const suppressResizeObserverOverlay = (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
  };

  window.addEventListener(
    "error",
    (event) => {
      const message = event.message || event.error?.message;

      if (isResizeObserverMessage(message)) {
        suppressResizeObserverOverlay(event);
      }
    },
    true
  );

  window.addEventListener(
    "unhandledrejection",
    (event) => {
      const reason =
        typeof event.reason === "string"
          ? event.reason
          : event.reason?.message;

      if (isResizeObserverMessage(reason)) {
        suppressResizeObserverOverlay(event);
      }
    },
    true
  );

  const originalConsoleError = console.error;
  console.error = (...args) => {
    const [firstArg] = args;
    const message =
      typeof firstArg === "string" ? firstArg : firstArg?.message || "";

    if (isResizeObserverMessage(message)) {
      return;
    }
    originalConsoleError(...args);
  };
}

const root = createRoot(document.getElementById("root"));

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
