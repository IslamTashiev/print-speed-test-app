import React from "react";
import { Box, Button, styled } from "@mui/material";
import { useTranslation } from "react-i18next";

import InfoItem from "./InfoItem";
import { ReactComponent as RetryIcon } from "icons/retry.svg";

interface ITestInfoProps {
	speed: number;
	accuracy: number;
}

const TestInfo = ({ speed, accuracy }: ITestInfoProps) => {
	const { t } = useTranslation();

	return (
		<TestInfoWrapper>
			<Box className='info-items'>
				<InfoItem type='accuracy' value={accuracy} />
				<InfoItem type='speed' value={speed} />
			</Box>
			<Button className='retry-button' variant='text' startIcon={<RetryIcon />}>
				{t("retry")}
			</Button>
		</TestInfoWrapper>
	);
};

const TestInfoWrapper = styled(Box)(() => ({
	borderRadius: "10px",
	background: "#4C5558",
	padding: "24px",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	alignItems: "start",
	width: "15%",

	".info-items": {
		display: "flex",
		flexDirection: "column",
		gap: "24px",
	},
	".retry-button": {
		marginTop: 32,
	},
}));

export default TestInfo;
