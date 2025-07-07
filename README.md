# Netflix GPT: ReactJS, Firebase

    - Configure React App with Vite and pnpm
    - Configure Tailwind CSS and Daisy UI
    - Login Form
    - Sign In form
    - Form Validation - useRef hook
    - Firebase Setup

## Firebase Setup
  - Create a new firebase account, add new web-app project
    - **Setup Firebase**
        - `pnpm install firebase`
        - `pnpm install -g firebase-tools`
    - Create a new firebase-config file and upload the details
      - DO NOT PUSH THE API_KEY to GIT
        - Create `.env` file and store it there.
  - **Authentication**
      - Add Email/password authentication
      - Add Google Sign-in
  - **Commands for firebase deploy**
      - `firebase login`
      - `firebase init`
      - `firebase deploy`


## Features

- Login/ SignUp page
  - Sign In/ Signup form
  - Redirect to Browse page
- Browse (for Authentication)
  - Header
  - Main Movie
    - Trailer in background
    - Title & Description
    - Movie suggestions
      - MovieLists \* N
- Netflix GPT
  - Search
  - Movie Suggestion
