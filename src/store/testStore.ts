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
	textsIsLoaded: boolean;
	myPlace: number;
	getText: (language: string) => void;
	changeText: () => void;
	setTotalTime: () => void;
	setCountOfFailed: () => void;
	setTimerIsStarted: (value: boolean) => void;
	setArrOfCheckedSimbols: (prevState: string) => void;
	setCurrentSpeed: (value: number) => void;
	setAccuracy: (value: number) => void;
	resetAllStates: () => void;
	setMyPlace: (value: number) => void;
	clearArrOfCheckedSimbols: () => void;
}
interface IData {
	id: string;
	text?: string;
}
export const useTestStore = create<ITextStoreState>((set, get) => ({
	testedText: "",
	allTexts: [],
	totalTime: 0,
	timerIsStarted: false,
	countOfFailed: 0,
	arrOfCheckedSimbols: [],
	currentSpeed: 0,
	accuracy: 100,
	textsIsLoaded: false,
	myPlace: 0,
	setMyPlace: async (currentSpeed: number) => {
		const q = query(collection(db, "users"), where("bestSpeed", ">", currentSpeed));
		const usersSnapshot = await getDocs(q);
		const data = usersSnapshot.docs.map((item) => ({ id: item.id, ...item.data() }));

		set({ myPlace: data.length + 1 });
	},
	getText: async (language: string) => {
		set({ testedText: "", textsIsLoaded: false });
		const q = query(collection(db, "texts"), where("textLanguage", "==", language));
		const textsSnapshot = await getDocs(q);
		const data: IData[] = textsSnapshot.docs.map((item) => ({
			...item.data(),
			id: item.id,
		}));
		set({ allTexts: data });
		set({ testedText: getRandomElement(data, ""), textsIsLoaded: true });
	},
	changeText: () => {
		const { resetAllStates } = get();
		resetAllStates();
		set((state) => ({
			testedText: getRandomElement(state.allTexts, state.testedText),
		}));
	},
	resetAllStates: () => {
		set({
			testedText: "",
			totalTime: 0,
			timerIsStarted: false,
			countOfFailed: 0,
			arrOfCheckedSimbols: [],
			currentSpeed: 0,
			accuracy: 100,
		});
	},
	setTotalTime: () => set((state) => ({ totalTime: state.totalTime + 1 })),
	setCountOfFailed: () => set((state) => ({ countOfFailed: state.countOfFailed + 1 })),
	setTimerIsStarted: (value: boolean) => set({ timerIsStarted: value }),
	setArrOfCheckedSimbols: (newSimbol: string) =>
		set((state) => ({ arrOfCheckedSimbols: [...state.arrOfCheckedSimbols, newSimbol] })),
	setCurrentSpeed: (value: number) => set({ currentSpeed: value }),
	setAccuracy: (value: number) => set({ accuracy: value }),
	clearArrOfCheckedSimbols: () => set({ arrOfCheckedSimbols: [] }),
}));

const getRandomElement = (arr: IData[], lastRandomText: string): string | undefined => {
	if (arr.length === 0) {
		return "";
	}
	if (arr.length === 1) {
		return arr[0].text;
	}

	const shuffledArr = [...arr].sort(() => Math.random() - 0.5);

	for (const item of shuffledArr) {
		if (item.text !== lastRandomText) {
			return item.text;
		}
	}
	return undefined;
};
