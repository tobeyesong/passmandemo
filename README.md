# PassMan

A full-stack password manager with instant search, auto-fetched company logos, and password strength analysis.

**[Live Demo →](https://passmandemo.herokuapp.com/)**

![PassMan Screenshot](https://i.imgur.com/MxFGAKb.png)

---

## Features

### 🔐 Password Management
Securely store credentials with URL, username, password, and notes. Company logos are automatically fetched via [Logo.dev](https://logo.dev) API for visual recognition.

### 📝 Notes Management
Create and organize secure notes with titles and content — perfect for storing sensitive information that doesn't fit the password format.

### ⚡ Algolia-Powered Search
Instant, typo-tolerant search across all passwords and notes. Results appear as you type with sub-100ms response times.

- [Search Implementation](https://github.com/tobeyesong/passmandemo/blob/master/frontend/src/components/screens/SearchScreen.js)

### 💪 Password Strength Meter
Real-time password analysis using [zxcvbn](https://github.com/dropbox/zxcvbn) — the same library used by Dropbox. Get feedback like "WEAK", "FAIR", or "STRONG" with a visual progress bar.

- [Strength Meter Code](https://github.com/tobeyesong/passmandemo/blob/master/frontend/src/components/misc/PasswordMeter.js)

---

## Tech Stack

### Frontend
- **React 17** with Redux state management
- **Tailwind CSS** for styling
- **Algolia InstantSearch** for real-time search UI
- **React Router 6** for navigation
- **React Final Form** for form handling

### Backend
- **Node.js / Express** REST API
- **MongoDB / Mongoose** for data persistence
- **JWT** authentication
- **bcrypt** password hashing
- **Algolia** search indexing

### APIs
- **[Logo.dev](https://logo.dev)** — Company logo fetching
- **[Algolia](https://algolia.com)** — Search-as-a-service

---

## Screenshots

### Password Strength Meter
![Password Meter](https://i.imgur.com/MxFGAKb.png)

### Algolia Search
![Algolia Search](https://github.com/tobeyesong/passmandemo/assets/65470881/b80ef2b0-9de8-438f-a13e-22fc017f47a0)

---

## Local Development

```bash
# Clone the repo
git clone https://github.com/tobeyesong/passmandemo.git
cd passmandemo

# Install dependencies
npm install
cd frontend && npm install && cd ..

# Set up environment variables
cp .env.example .env
# Add your MongoDB URI, JWT secret, and Algolia credentials

# Run development server
npm run dev
```

---

## License

MIT
