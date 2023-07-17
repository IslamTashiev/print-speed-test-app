import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en.json";
import translationRU from "./locales/ru.json";
import translationUKR from "./locales/ukr.json";

const resources = {
	en: {
		translation: translationEN,
	},
	ru: {
		translation: translationRU,
	},
	ukr: {
		translation: translationUKR,
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng: localStorage.getItem("language") || "ru", // Язык по умолчанию
	fallbackLng: "ru", // Язык, который будет использоваться, если перевод для текущего языка не найден
	interpolation: {
		escapeValue: false, // Разрешить использование HTML-тегов в переводах
	},
});

export default i18n;
