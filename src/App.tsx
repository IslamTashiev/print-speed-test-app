import { Box } from "@mui/material";
import Router from "./Router";
import SideBar from "./components/SideBar/SideBar";

function App() {
	return (
		<Box display='flex' gap={4}>
			<SideBar />
			<Router />
		</Box>
	);
}

export default App;
