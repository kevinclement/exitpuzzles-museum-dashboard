import firebase from 'firebase/app'
import 'firebase/database'

// Get a Firestore instance
export const db = firebase
  .initializeApp({ databaseURL: require('../db.json').dev })
  .database()

export const ref = db.ref('museum').child('devices/dashboard')