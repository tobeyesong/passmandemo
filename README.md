# PASSMAN DEMO

## Local Setup

- Use Node `20.19.0` and npm `10.8.x`. The repo now includes `.nvmrc`.
- Install root dependencies with `npm install`.
- Install frontend dependencies with `npm install --prefix frontend`.
- Add backend env vars in `.env`:
  - `MONGO_URI` or `DB_USER` + `DB_PASS`
- Run the app with `npm run dev`.
- Run frontend verification with `npm run verify`.


# Portfolio Repository
---

## 1. Password Strength Meter

Utilizes the `zxcvbn` library to gauge password strength. Users receive feedback labels: "UNSTEADY", "FEEBLE", "ACCEPTABLE", or "EXCEPTIONAL".  Additionally, a colored progress bar visually represents the strength score.

- [View Code](https://github.com/tobeyesong/passmandemo/blob/master/frontend/src/components/misc/PasswordMeter.js)
---

![alt text](https://i.imgur.com/MxFGAKb.png)

## 2. Notes Management

Enables users to create, view, and manage notes with a title, and caption. 

- [View Code](https://github.com/tobeyesong/passmandemo/blob/master/frontend/src/components/screens/NoteScreen.js)


---

## 3. Passwords Management

Securely store and manage passwords. Each entry includes a URL, username, password, and optional notes. Automatically fetches associated website logos.

- [View Code](https://github.com/tobeyesong/passmandemo/blob/master/frontend/src/components/screens/PasswordScreen.js)

---

## 4. Algolia Integration

Integrates with Algolia for efficient indexing and searching of notes and passwords.

- [View Code for Passwords](https://github.com/tobeyesong/passmandemo/blob/master/backend/controllers/passwordsControllers.js)
- [View Code for Notes](https://github.com/tobeyesong/passmandemo/blob/master/backend/controllers/notesController.js)
![image](https://github.com/tobeyesong/passmandemo/assets/65470881/b80ef2b0-9de8-438f-a13e-22fc017f47a0)
