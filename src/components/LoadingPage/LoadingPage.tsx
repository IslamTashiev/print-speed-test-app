import { Box, styled } from "@mui/material";
import { ReactComponent as LogoLight } from "icons/logo-light.svg";

const LoadingPage = () => {
	return (
		<LoadingPageWrapper>
			<LogoLight />
		</LoadingPageWrapper>
	);
};

const LoadingPageWrapper = styled(Box)(() => ({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	width: "100%",
	height: "100vh",
}));

export default LoadingPage;
