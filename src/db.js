import firebase from 'firebase/app'
import 'firebase/database'

const dbJSON = require('../db.json')

let url = dbJSON.dev
if (process.env.VUE_APP_DEV_MODE && process.env.VUE_APP_DEV_MODE == 'production') {
  url = dbJSON.prod
}

// Get a Firestore instance
export const db = firebase
  .initializeApp({ databaseURL: url })
  .database()

export const ref = db.ref('museum').child('devices/dashboard')