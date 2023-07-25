import { Box } from "@mui/material";
import Router from "./Router";
import SideBar from "./components/SideBar/SideBar";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { useUserStore } from "./store/userStore";
import { User as FirebaseUser } from "firebase/auth";

function App() {
	const { setUser, user, getUserStats } = useUserStore((state) => state);

	useEffect(() => {
		onAuthStateChanged(auth, (_user: FirebaseUser | null) => {
			if (!auth.currentUser && !user) {
				setUser(_user);
			} else {
				setUser(auth.currentUser);
			}
		});
		getUserStats();
	}, [!auth.currentUser]);

	return (
		<Box display='flex'>
			<SideBar />
			<Router />
		</Box>
	);
}

export default App;
