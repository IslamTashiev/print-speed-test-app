import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
	apiKey: "AIzaSyBEyVLdN-3bHgrWvennbIw5OudLDZ-0sWo",
	authDomain: "print-speed.firebaseapp.com",
	projectId: "print-speed",
	storageBucket: "print-speed.appspot.com",
	messagingSenderId: "268722546191",
	appId: "1:268722546191:web:db5dee3365f16c4760a57a",
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const rdb = getDatabase(app);
provider.setCustomParameters({ prompt: "select_account" });
