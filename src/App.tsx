import { Box } from "@mui/material";
import Router from "./Router";
import SideBar from "./components/SideBar/SideBar";

function App() {
	return (
		<Box display='flex'>
			<SideBar />
			<Router />
		</Box>
	);
}

export default App;
