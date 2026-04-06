# PracticeFirestoreCrud

# 🔥 Firestore CRUD Demo with Angular

This project is a simple Angular application that demonstrates **CRUD (Create, Read, Update, Delete)** operations using **Firebase Firestore**.
It uses Firestore as a NoSQL database to manage a `users` collection, allowing you to:

- Add a new user
- View all users
- Update user details
- Delete a user

## 🚀 Tech Stack

- **Angular**
- **Firebase Firestore**
- **Signals** for reactive state management

## 📦 Features

- 🔄 Real-time updates from Firebase/Firestore
- 🔥 Seamless Firebase integration via Firebase SDK

### 🔥 Firebase Setup

1.  run `npm install firebase` command on your terminal window.
2.  Go to Firebase Console in firebase.google.com
    1. Create a new project
    2. Enable Cloud Firestore (in test mode)
    3. Copy the firebaseConfig object from your Firebase project settings
    4. Create a new file - firebase.config.ts to store firebase configurations.container
    5. Paste the firebaseConfig object in the firebase.config.ts
