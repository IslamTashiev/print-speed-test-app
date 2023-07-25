import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";
import { useTranslation } from "react-i18next";
import HistoryPage from "./pages/HistoryPage";

interface IRoutes {
	path: string;
	element: (title: string) => JSX.Element;
	title: string;
}

const Router = () => {
	const { t } = useTranslation();

	const r: IRoutes[] = [
		{ path: "/", element: (title: string) => <MainPage title={title} />, title: t("start_test") },
		{
			path: "/history",
			element: (title: string) => <HistoryPage title={title} />,
			title: t("history"),
		},
		{ path: "/authorization/:authType", element: () => <AuthPage />, title: "" },
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
