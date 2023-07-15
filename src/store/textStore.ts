import { db } from "@/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import create from "zustand";

interface ITextStoreState {
	testedText: string;
	allTexts: IData[];
	getText: (language: string) => void;
	changeText: () => void;
}
interface IData {
	id: string;
	text?: string;
}
export const useTextStore = create<ITextStoreState>((set) => ({
	testedText: "",
	allTexts: [],
	getText: async (language: string) => {
		set({ testedText: "" });
		const q = query(collection(db, "texts"), where("textLanguage", "==", language));
		const textsSnapshot = await getDocs(q);
		const data: IData[] = textsSnapshot.docs.map((item) => ({
			...item.data(),
			id: item.id,
		}));
		set({ allTexts: data });
		set({ testedText: getRandomElement(data, "") });
	},
	changeText: () =>
		set((state) => ({ testedText: getRandomElement(state.allTexts, state.testedText) })),
}));

const getRandomElement = (arr: IData[], lastRandomText: string): string | undefined => {
	if (arr.length === 0) {
		return undefined;
	}

	const shuffledArr = [...arr].sort(() => Math.random() - 0.5);

	for (const item of shuffledArr) {
		if (item.text !== lastRandomText) {
			return item.text;
		}
	}
	return undefined;
};
