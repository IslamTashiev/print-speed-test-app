import { Box, styled } from "@mui/material";

import Test from "./Test";
import TestInfo from "./TestInfo";

const TestBlock = () => {
	return (
		<TestBlockWrapper>
			<Test />
			<TestInfo />
		</TestBlockWrapper>
	);
};

const TestBlockWrapper = styled(Box)(() => ({
	borderRadius: "10px",
	border: "1px solid #4C5558",
	background: "#3F4649",
	boxShadow: "0px 0px 32px -13px rgba(0, 0, 0, 0.25)",
	display: "flex",
	justifyContent: "space-between",
}));

export default TestBlock;
