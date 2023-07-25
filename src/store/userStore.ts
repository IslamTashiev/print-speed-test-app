import create from "zustand";
import {
	User as FirebaseUser,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	signOut,
} from "firebase/auth";
import { IUserData } from "@/pages/AuthPage";
import { auth, db } from "@/firebase/config";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { getMonthByIndex } from "@/utils/getMonthByIndex";

interface IUserState {
	user: FirebaseUser | null;
	userStats: IUpdatedUser | null;
	historyItems: IHistoryItem[];
	login: (value: IUserData) => void;
	register: (value: IUserData) => void;
	setUser: (value: FirebaseUser | null) => void;
	logout: () => void;
	createUserInDb: (userData: IUserInfo) => void;
	updateUserStat: (userData: IUpdatedUser) => void;
	getUserStats: () => void;
	setHistoryItem: (speed: number, accuracy: number) => void;
	getHistoryItems: () => void;
}

export interface IHistoryItem {
	speed: number;
	accuracy: number;
	month: string;
	day: number;
	year: number;
	time: string;
}

interface IUserInfo {
	bestPlace: number;
	bestAccuracy: number;
	bestSpeed: number;
	photoURL: string | null;
	uid: string;
}
export interface IUpdatedUser {
	bestPlace: number;
	bestAccuracy: number;
	bestSpeed: number;
	photoURL?: string | null;
	uid: string;
	id?: string;
}

export const useUserStore = create<IUserState>((set, get) => ({
	user: null,
	userStats: null,
	historyItems: [],
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
	getUserStats: async () => {
		const { user } = get();

		if (user) {
			const q = query(collection(db, "users"), where("uid", "==", user.uid));
			const userDocSnapshot = await getDocs(q);
			const userDoc = userDocSnapshot.docs.map((item) => ({
				id: item.id,
				...item.data(),
			}))[0] as IUpdatedUser;

			set({ userStats: userDoc });
		}
	},
	setHistoryItem: (speed: number, accuracy: number) => {
		const date = new Date();
		const month = getMonthByIndex(date.getMonth());
		const day = date.getDate();
		const year = date.getFullYear();
		const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

		const historyItem: IHistoryItem = { speed, accuracy, month, day, year, time };
		let myHistoryJson = localStorage.getItem("history");

		if (myHistoryJson) {
			let myHistory = JSON.parse(myHistoryJson);
			localStorage.setItem("history", JSON.stringify([...myHistory, historyItem]));
		} else {
			localStorage.setItem("history", JSON.stringify([historyItem]));
		}

		set(({ historyItems }) => ({ historyItems: [...historyItems, historyItem] }));
	},
	getHistoryItems: () => {
		const historyItemsJson = localStorage.getItem("history");
		if (historyItemsJson) {
			set({ historyItems: JSON.parse(historyItemsJson) });
		}
	},
}));
