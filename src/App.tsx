import { Box } from "@mui/material";
import Router from "./Router";
import SideBar from "./components/SideBar/SideBar";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { useUserStore } from "./store/userStore";
import { User as FirebaseUser } from "firebase/auth";

function App() {
	const { setUser, user, getUserStats, userLoaded, setUserLoaded } = useUserStore((state) => state);

	useEffect(() => {
		onAuthStateChanged(auth, (_user: FirebaseUser | null) => {
			if (!auth.currentUser && !user) {
				setUser(_user);
			} else {
				setUser(auth.currentUser);
			}
			setUserLoaded(true);
		});
		getUserStats();
	}, [!auth.currentUser]);

	return userLoaded ? (
		<Box display='flex'>
			<SideBar />
			<Router />
		</Box>
	) : (
		<LoadingPage />
	);
}

export default App;
