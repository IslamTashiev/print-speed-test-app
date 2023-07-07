import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";

interface IRoutes {
	path: string;
	element: (title: string) => JSX.Element;
	title: string;
}

const r: IRoutes[] = [
	{ path: "/", element: (title: string) => <MainPage title={title} />, title: "Начать тест" },
];

const Router = () => {
	return (
		<Routes>
			{r.map((route, index) => (
				<Route key={route.path + index} element={route.element(route.title)} path={route.path} />
			))}
		</Routes>
	);
};

export default Router;
