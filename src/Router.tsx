import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LgoinPage from "./pages/LgoinPage";
import { useTranslation } from "react-i18next";

interface IRoutes {
	path: string;
	element: (title: string) => JSX.Element;
	title: string;
}

const Router = () => {
	const { t } = useTranslation();

	const r: IRoutes[] = [
		{ path: "/", element: (title: string) => <MainPage title={title} />, title: t("start_test") },
		{ path: "/authorization", element: () => <LgoinPage />, title: "" },
	];
	return (
		<Routes>
			{r.map((route, index) => (
				<Route key={route.path + index} element={route.element(route.title)} path={route.path} />
			))}
		</Routes>
	);
};

export default Router;
