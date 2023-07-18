import create, { State, SetState } from "zustand";
import {
	User as FirebaseUser,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	signOut,
} from "firebase/auth";
import { IUserData } from "@/pages/AuthPage";
import { auth, db } from "@/firebase/config";
import { addDoc, collection, doc, getDoc, query, setDoc, where } from "firebase/firestore";

interface IUserState {
	user: FirebaseUser | null;
	login: (value: IUserData) => void;
	register: (value: IUserData) => void;
	setUser: (value: FirebaseUser | null) => void;
	logout: () => void;
	createUserInDb: (userData: IUserInfo) => void;
}

interface IUserInfo {
	bestPlace: number;
	bestAccuracy: number;
	bestSpeed: number;
	photoURL: string | null;
	uid: string;
}

export const useUserStore = create<IUserState>((set, get) => ({
	user: null,
	login: async (userData: IUserData) => {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			userData.email,
			userData.password
		);
		set({ user: userCredential.user });
	},
	setUser: (user: FirebaseUser | null) => set({ user }),
	register: async (userData: IUserData) => {
		const { email, name, password, bestAccuracy, bestPlace, bestSpeed } = userData;
		const state = get();

		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;
		await updateProfile(user, {
			displayName: name,
			photoURL: "https://api.dicebear.com/6.x/avataaars-neutral/svg?seed=" + userData.name,
		});

		state.createUserInDb({
			bestAccuracy,
			bestPlace,
			bestSpeed,
			uid: user.uid,
			photoURL: user.photoURL,
		});

		set({ user: user });
	},
	logout: async () => {
		await signOut(auth);
		set({ user: null });
	},
	createUserInDb: async (userData: IUserInfo) => {
		const { bestAccuracy, bestPlace, bestSpeed, photoURL, uid } = userData;

		const userRef = collection(db, "users");
		const userDocRef = doc(db, "users", uid);
		const userDocSnapshot = await getDoc(userDocRef);

		if (!userDocSnapshot.exists()) {
			await addDoc(userRef, {
				bestAccuracy,
				bestPlace,
				bestSpeed,
				uid: uid,
				photoURL: photoURL,
			});
		}
	},
}));
