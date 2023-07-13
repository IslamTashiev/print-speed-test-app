import React, { useState } from "react";
import { Box, List, ListItem, ListItemButton, Typography, styled } from "@mui/material";
import clsx from "clsx";

import { ReactComponent as RuIcon } from "icons/language-ru.svg";
import { ReactComponent as EnIcon } from "icons/language-en.svg";
import { ReactComponent as UkrIcon } from "icons/language-ukr.svg";

interface LanguageInfo {
	icon: JSX.Element;
	language: string;
}

const languagesInfo: LanguageInfo[] = [
	{ icon: <RuIcon />, language: "Русский" },
	{ icon: <EnIcon />, language: "English" },
	{ icon: <UkrIcon />, language: "Украинська" },
];

const LanguageSelector = (): JSX.Element => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<LanguageSelectorWrapper>
			<Box
				onClick={() => setIsOpen(!isOpen)}
				className={clsx("language-selector-current", { open: isOpen })}
			>
				<RuIcon />
				<Typography variant='body2' color='text.primary' fontSize={14}>
					Русский
				</Typography>
			</Box>
			<Box className={clsx("language-selector-list", { open: isOpen })}>
				<Box className='language-selector-list-inner'>
					<List>
						{languagesInfo.map((item: LanguageInfo) => (
							<ListItem key={item.language}>
								<ListItemButton>
									<Box className='language-selector-list-item'>
										{item.icon}
										<Typography variant='body2' color='text.primary' fontSize={14}>
											{item.language}
										</Typography>
									</Box>
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</Box>
			</Box>
		</LanguageSelectorWrapper>
	);
};

const LanguageSelectorWrapper = styled(Box)(() => ({
	position: "relative",

	".language-selector-current": {
		display: "flex",
		alignItems: "center",
		gap: "8px",
		padding: "12px 32px",
		cursor: "pointer",
		backgroundColor: "#3F4649",
		borderRadius: "10px",
		position: "relative",
		zIndex: 2,
	},

	".language-selector-list": {
		position: "absolute",
		width: "100%",
		backgroundColor: "#4C5558",
		borderRadius: "10px",
		paddingTop: "41px",
		top: "0",
		zIndex: 0,
		overflow: "hidden",
		maxHeight: "0",
		transition: "all .5s ease",
		"&.open": {
			maxHeight: "400px", // установите желаемую высоту
		},
	},

	".language-selector-list-inner": {
		overflow: "auto",
	},

	".language-selector-list-item": {
		display: "flex",
		alignItems: "center",
		gap: "8px",
	},

	".MuiList-root": {
		padding: 0,
		".MuiListItem-root": {
			padding: 0,
		},
	},
}));

export default LanguageSelector;
