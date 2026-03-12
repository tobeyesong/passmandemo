/** @format */

import faker from "faker";

const curatedDomains = [
  "github.com",
  "google.com",
  "notion.so",
  "figma.com",
  "stripe.com",
  "slack.com",
  "vercel.com",
  "netflix.com",
  "spotify.com",
  "dropbox.com",
  "linear.app",
  "openai.com",
  "discord.com",
  "amazon.com",
  "apple.com",
  "microsoft.com",
  "airbnb.com",
  "doordash.com",
  "chase.com",
  "bankofamerica.com",
  "capitalone.com",
  "paypal.com",
  "adobe.com",
  "salesforce.com",
  "cloudflare.com",
  "digitalocean.com",
  "asana.com",
  "zoom.us",
  "reddit.com",
  "facebook.com",
  "linkedin.com",
  "x.com",
  "youtube.com",
  "hubspot.com",
  "atlassian.com",
  "1password.com",
  "lastpass.com",
  "shopify.com",
  "duolingo.com",
  "24hourfitness.com",
];

const noteTitlePrefixes = [
  "Recovery codes",
  "Onboarding checklist",
  "Emergency access",
  "Billing contact",
  "Tax reminder",
  "Deployment notes",
  "Shared Wi-Fi",
  "Support handoff",
  "Travel checklist",
  "Account owner",
];

const noteBodyTemplates = [
  "Primary owner: {{name}}. Keep this note updated after any credential rotation.",
  "Backup codes stored in the team vault. Last reviewed on {{date}}.",
  "Use this when traveling. Escalate to {{name}} if the normal login flow fails.",
  "Customer support reference for {{company}}. Includes billing portal details and fallback steps.",
  "Temporary setup note. Remove stale instructions once the new flow is live.",
  "Renewal reminder for {{company}}. Verify payment method and owner before the next cycle.",
];

const passwordNoteTemplates = [
  "Two-factor required. Recovery codes are stored in a secure note.",
  "Shared with operations. Rotate after contractor access ends.",
  "Billing-only login. Use the finance alias to receive alerts.",
  "Legacy account kept for exports. Avoid changing the username.",
  "Admin access. Review before customer demos and quarterly audits.",
  "",
  "",
];

const modeConfig = {
  demo: {
    seed: 20260312,
    passwordCount: 24,
    noteCount: 14,
  },
  stress: {
    seed: 20260313,
    passwordCount: 220,
    noteCount: 140,
  },
};

const buildGeneratedDomain = () =>
  `${faker.internet.domainWord()}-${faker.random
    .alphaNumeric(3)
    .toLowerCase()}.${faker.internet.domainSuffix()}`;

const buildDomain = (index, mode) => {
  const shouldUseCurated =
    index < curatedDomains.length || faker.datatype.number({ min: 0, max: 100 }) < 65;

  if (shouldUseCurated) {
    return curatedDomains[index % curatedDomains.length];
  }

  return mode === "stress" ? buildGeneratedDomain() : faker.internet.domainName();
};

const buildPasswordNote = () => {
  const template =
    passwordNoteTemplates[
      faker.datatype.number({ min: 0, max: passwordNoteTemplates.length - 1 })
    ];

  return template;
};

const buildNoteBody = () => {
  const template =
    noteBodyTemplates[
      faker.datatype.number({ min: 0, max: noteBodyTemplates.length - 1 })
    ];

  return template
    .replace("{{name}}", faker.name.findName())
    .replace("{{company}}", faker.company.companyName())
    .replace("{{date}}", faker.date.future().toLocaleDateString("en-US"));
};

const buildPassword = (index, mode) => ({
  username: faker.internet.email().toLowerCase(),
  url: buildDomain(index, mode),
  sitePassword: faker.internet.password(18),
  notes: buildPasswordNote(),
});

const buildNote = (index, mode) => ({
  title: `${noteTitlePrefixes[index % noteTitlePrefixes.length]}: ${
    curatedDomains[index % curatedDomains.length]
  }`,
  caption:
    mode === "stress" && faker.datatype.number({ min: 0, max: 100 }) < 22
      ? ""
      : buildNoteBody(),
  image: "",
  category: "Note",
});

const createEntries = (count, creator) =>
  Array.from({ length: count }, (_, index) => creator(index));

export const createSeedData = (mode = "demo") => {
  const config = modeConfig[mode] || modeConfig.demo;

  faker.seed(config.seed);

  return {
    passwords: createEntries(config.passwordCount, (index) =>
      buildPassword(index, mode)
    ),
    notes: createEntries(config.noteCount, (index) => buildNote(index, mode)),
  };
};

export const availableSeedModes = Object.keys(modeConfig);
