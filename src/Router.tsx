import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";

const r = [
    { path: "/", element: <MainPage /> }
]


const Router = () => {
    return (<Routes>
        {r.map((route, index) => (
            <Route
                key={route.path + index}
                element={route.element}
                path={route.path}
            />
        ))}
    </Routes>);
}

export default Router;