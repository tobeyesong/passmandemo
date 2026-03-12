/** @format */

import React, { useMemo, useState } from "react";

const LOGO_DEV_TOKEN = "pk_H82lg8wdSsOq6I1XLEFkyg";

const normalizeHostname = (value) => {
  if (!value) {
    return "";
  }

  const trimmed = value.trim();
  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    return new URL(withProtocol).hostname;
  } catch {
    return trimmed.replace(/^https?:\/\//i, "").split("/")[0];
  }
};

const getLogoUrl = (hostname, size) =>
  `https://img.logo.dev/${encodeURIComponent(
    hostname
  )}?token=${LOGO_DEV_TOKEN}&size=${size}&format=png&retina=true&fallback=404`;

const SiteLogo = ({ url, className, size = 56 }) => {
  const [hasError, setHasError] = useState(false);
  const hostname = useMemo(() => normalizeHostname(url), [url]);
  const initial = hostname ? hostname.charAt(0).toUpperCase() : "?";

  if (!hostname || hasError) {
    return (
      <div
        aria-label='logo fallback'
        className={`${className} flex items-center justify-center bg-amber-400 text-xl font-semibold uppercase text-slate-950`}>
        {initial}
      </div>
    );
  }

  return (
    <img
      alt={`${hostname} logo`}
      src={getLogoUrl(hostname, size)}
      onError={() => setHasError(true)}
      width={size}
      height={size}
      loading='lazy'
      className={className}
    />
  );
};

export default SiteLogo;
