import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxtTYCsEml7HSqMlYj7KmvmpzjOzJgS1g",
  authDomain: "miniblog-b35af.firebaseapp.com",
  projectId: "miniblog-b35af",
  storageBucket: "miniblog-b35af.appspot.com",
  messagingSenderId: "990483463769",
  appId: "1:990483463769:web:b09ce79101c550977ffb48"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };