import React, { useState } from "react";
import { Box, Button, List, ListItem, ListItemButton, Typography, styled } from "@mui/material";
import clsx from "clsx";
import i18n from "../../i18n";

import { ReactComponent as RuIcon } from "icons/language-ru.svg";
import { ReactComponent as EnIcon } from "icons/language-en.svg";
import { ReactComponent as UkrIcon } from "icons/language-ukr.svg";
import { useTestStore } from "@/store/testStore";

type ICurrentLanguage = "ru" | "en" | "ukr";

interface ILanguageSelectorProps {
	changeGlobal?: boolean;
}

const languagesInfo = {
	ru: { icon: <RuIcon />, language: "Русский", key: "ru" },
	en: { icon: <EnIcon />, language: "English", key: "en" },
	ukr: { icon: <UkrIcon />, language: "Украинська", key: "ukr" },
};

const LanguageSelector = ({ changeGlobal }: ILanguageSelectorProps): JSX.Element => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [currentLanguage, setCurrentLanguage] = useState<ICurrentLanguage>(
		i18n.language as ICurrentLanguage
	);

	const { getText, resetAllStates } = useTestStore((state) => state);

	const changeLanguage = (language: ICurrentLanguage) => {
		if (!changeGlobal) {
			i18n.changeLanguage(language);
			getText(language);
			resetAllStates();
			localStorage.setItem("language", language);
		}
		setCurrentLanguage(language);
		setIsOpen(false);
	};

	return (
		<LanguageSelectorWrapper className={clsx("language-selector", { "full-width": !changeGlobal })}>
			<Button
				variant='text'
				onClick={() => setIsOpen(!isOpen)}
				className={clsx("language-selector-current", { open: isOpen })}
			>
				{!changeGlobal && languagesInfo?.[currentLanguage]?.icon}
				<Typography className='language' variant='body2' color='text.primary' fontSize={14}>
					{languagesInfo?.[currentLanguage]?.language}
				</Typography>
			</Button>
			<Box className={clsx("language-selector-list", { open: isOpen })}>
				<Box className='language-selector-list-inner'>
					<List>
						{Object.values(languagesInfo).map((item) => (
							<ListItem key={item.language}>
								<ListItemButton onClick={() => changeLanguage(item.key as ICurrentLanguage)}>
									<Box className='language-selector-list-item'>
										{!changeGlobal && item.icon}
										<Typography
											className='language'
											variant='body2'
											color='text.primary'
											fontSize={14}
										>
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
	maxWidth: "80%",
	"&.full-width": {
		maxWidth: "100%",
	},

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
		width: "100%",
	},

	".language-selector-list": {
		position: "absolute",
		width: "100%",
		backgroundColor: "#4C5558",
		borderRadius: "10px",
		paddingTop: "40px",
		top: "0",
		zIndex: 1,
		overflow: "hidden",
		maxHeight: "0",
		transition: "all .5s ease",
		boxShadow: "0px 0px 32px -13px rgba(0, 0, 0, 0.45)",
		"&.open": {
			maxHeight: "400px", // установите желаемую высоту
		},
	},

	".language-selector-list-inner": {
		overflow: "auto",
		marginTop: 5,
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
