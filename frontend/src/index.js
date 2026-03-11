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

  window.addEventListener("error", (event) => {
    if (resizeObserverError.test(event.message)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });
}

const root = createRoot(document.getElementById("root"));

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
