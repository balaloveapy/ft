
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBZuIx6f6_9GxQBfsz1qeaJjaGJrdOXXhI",
  authDomain: "ft-cam.firebaseapp.com",
  projectId: "ft-cam",
  storageBucket: "ft-cam.appspot.com",
  messagingSenderId: "533799701528",
  appId: "1:533799701528:web:acf81ea1c4821a6b13476d"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)