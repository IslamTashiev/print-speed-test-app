import React from "react";
import { Box, styled } from "@mui/material";
import InfoItem from "./InfoItem";

const TestInfo = () => {
	return (
		<TestInfoWrapper>
			<Box>
				<InfoItem type='accuracy' value={100} />
				<InfoItem type='speed' value={234} />
			</Box>
			<Box></Box>
		</TestInfoWrapper>
	);
};

const TestInfoWrapper = styled(Box)(() => ({}));

export default TestInfo;
