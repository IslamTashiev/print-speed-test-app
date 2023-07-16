import { db } from "@/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import create from "zustand";

interface ITextStoreState {
	testedText: string;
	allTexts: IData[];
	totalTime: number;
	timerIsStarted: boolean;
	countOfFailed: number;
	arrOfCheckedSimbols: string[];
	currentSpeed: number;
	accuracy: number;
	getText: (language: string) => void;
	changeText: () => void;
	setTotalTime: () => void;
	setCountOfFailed: () => void;
	setTimerIsStarted: (value: boolean) => void;
	setArrOfCheckedSimbols: (prevState: string) => void;
	setCurrentSpeed: (value: number) => void;
	setAccuracy: (value: number) => void;
}
interface IData {
	id: string;
	text?: string;
}
export const useTestStore = create<ITextStoreState>((set) => ({
	testedText: "",
	allTexts: [],
	totalTime: 0,
	timerIsStarted: false,
	countOfFailed: 0,
	arrOfCheckedSimbols: [],
	currentSpeed: 0,
	accuracy: 100,
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
	changeText: () => {
		set((state) => ({
			testedText: getRandomElement(state.allTexts, state.testedText),
			totalTime: 0,
			timerIsStarted: false,
			countOfFailed: 0,
			arrOfCheckedSimbols: [],
			currentSpeed: 0,
			accuracy: 100,
		}));
	},
	setTotalTime: () => set((state) => ({ totalTime: state.totalTime + 1 })),
	setCountOfFailed: () => set((state) => ({ countOfFailed: state.countOfFailed + 1 })),
	setTimerIsStarted: (value: boolean) => set({ timerIsStarted: value }),
	setArrOfCheckedSimbols: (newSimbol: string) =>
		set((state) => ({ arrOfCheckedSimbols: [...state.arrOfCheckedSimbols, newSimbol] })),
	setCurrentSpeed: (value: number) => set({ currentSpeed: value }),
	setAccuracy: (value: number) => set({ accuracy: value }),
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
