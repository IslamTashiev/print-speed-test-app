import React from "react";
import { Box, Typography, styled } from "@mui/material";
import { useTranslation } from "react-i18next";

import { ReactComponent as SpeedIcon } from "icons/info-speed.svg";
import { ReactComponent as AccuracyIcon } from "icons/info-accuracy.svg";

interface IInfoItemProps {
	type: "accuracy" | "speed";
	direction?: "vertical" | "horizontal";
	value?: number;
	onModal?: boolean;
}

const infoTypes = {
	accuracy: {
		icon: <AccuracyIcon />,
		titleKey: "accuracy",
		prefixKey: "accuracy_prefix",
	},
	speed: {
		icon: <SpeedIcon />,
		titleKey: "speed",
		prefixKey: "speed_prefix",
	},
};

const InfoItem = ({ type, value, onModal, direction = "vertical" }: IInfoItemProps) => {
	const currentInfo = infoTypes[type];

	const { t } = useTranslation();

	return (
		<InfoItemWrapper color='text.primary' className={direction}>
			<Box className='info-item-head'>
				{currentInfo.icon}
				<Typography variant='body2' color='text.dark' className='info-item-head-title'>
					{t(currentInfo.titleKey)}
				</Typography>
				{onModal && (
					<Typography variant='body2'>
						{"("}
						{t(currentInfo.prefixKey)}
						{")"}
					</Typography>
				)}
			</Box>
			{value !== undefined && !onModal && (
				<Box className='info-item-value'>
					<Typography variant='h2'>{value}</Typography>
					<Typography variant='body2'>{t(currentInfo.prefixKey)}</Typography>
				</Box>
			)}
		</InfoItemWrapper>
	);
};

const InfoItemWrapper = styled(Box)(() => ({
	"&.horizontal": {
		display: "flex",
		alignItems: "center",
		gap: "48px",
	},

	".info-item-head": {
		display: "flex",
		alignItems: "center",
		gap: "4px",
		marginBottom: "4px",

		".info-item-head-title": {
			fontSize: "12px",
			fontWeight: "500",
		},
	},
	".info-item-value": {
		display: "flex",
		alignItems: "flex-end",
		gap: "2px",

		h2: {
			lineHeight: "normal",
			fontSize: "20px",
			fontWeight: "600",
		},
		p: {
			fontSize: "10px",
			fontWeight: "400",
		},
	},
}));

export default InfoItem;
