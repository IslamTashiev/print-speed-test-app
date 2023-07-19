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
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	updateDoc,
	where,
} from "firebase/firestore";

interface IUserState {
	user: FirebaseUser | null;
	login: (value: IUserData) => void;
	register: (value: IUserData) => void;
	setUser: (value: FirebaseUser | null) => void;
	logout: () => void;
	createUserInDb: (userData: IUserInfo) => void;
	updateUserStat: (userData: IUpdatedUser) => void;
}

interface IUserInfo {
	bestPlace: number;
	bestAccuracy: number;
	bestSpeed: number;
	photoURL: string | null;
	uid: string;
}
interface IUpdatedUser {
	bestPlace: number;
	bestAccuracy: number;
	bestSpeed: number;
	photoURL?: string | null;
	uid: string;
	id?: string;
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
		const q = query(collection(db, "users"), where("uid", "==", uid));
		const userDocSnapshot = await getDocs(q);

		if (userDocSnapshot.docs.length === 0) {
			await addDoc(userRef, {
				bestAccuracy,
				bestPlace,
				bestSpeed,
				uid: uid,
				photoURL: photoURL,
			});
		}
	},
	updateUserStat: async (userData: IUpdatedUser) => {
		const { bestAccuracy, bestPlace, bestSpeed } = userData;
		const { user } = get();

		if (user) {
			const q = query(collection(db, "users"), where("uid", "==", user.uid));
			const userDocSnapshot = await getDocs(q);
			const userDoc = userDocSnapshot.docs.map((item) => ({
				id: item.id,
				...item.data(),
			}))[0] as IUpdatedUser;

			if (userDoc && userDoc.id) {
				const userDocRef = doc(db, "users", userDoc.id);

				if (userDoc.bestSpeed < bestSpeed) {
					await updateDoc(userDocRef, { bestSpeed });
					await updateDoc(userDocRef, { bestAccuracy });
					await updateDoc(userDocRef, { bestPlace });
				}
			}
		}
	},
}));
