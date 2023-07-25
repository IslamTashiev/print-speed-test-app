import create from "zustand";
import { IUpdatedUser } from "./userStore";
import getRandomElement from "@/utils/getRandomElement";

interface ITitleStore {
	title: string;
	subTitle: string;
	setTitles: (title: string, subTitle: string) => void;
	generateTitles: (user: IUpdatedUser | null, speed: number) => void;
}

export const useTitleStore = create<ITitleStore>((set) => ({
	title: "",
	subTitle: "",
	setTitles: (title: string, subTitle: string) => set({ title, subTitle }),
	generateTitles: (user: IUpdatedUser | null, speed: number) => {
		const setTitles = () => {
			const subTitles = [
				"modal_subtitle_1",
				"modal_subtitle_2",
				"modal_subtitle_3",
				"modal_subtitle_4",
				"modal_subtitle_5",
				"modal_subtitle_6",
				"modal_subtitle_7",
				"modal_subtitle_8",
				"modal_subtitle_9",
				"modal_subtitle_10",
			];
			const titles = [
				"modal_title_1",
				"modal_title_2",
				"modal_title_3",
				"modal_title_4",
				"modal_title_5",
				"modal_title_6",
				"modal_title_7",
				"modal_title_8",
				"modal_title_9",
				"modal_title_10",
			];

			const randomSubTitle = getRandomElement(subTitles);
			const randomTitle = getRandomElement(titles);

			set({ title: randomTitle, subTitle: randomSubTitle });
		};

		if (user) {
			if (user.bestSpeed < speed) {
				set({ title: "modal_title_11", subTitle: "modal_subtitle_11" });
			} else {
				setTitles();
			}
		} else {
			setTitles();
		}
	},
}));
