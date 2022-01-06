import firebase from 'firebase'
import { firebaseConfig } from './firebaseConf'

export const firebaseApp = firebase.initializeApp(firebaseConfig)
