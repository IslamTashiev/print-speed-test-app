import { Box, Divider, List, ListItem, ListItemButton, Typography, styled } from "@mui/material";
import { useTranslation } from "react-i18next";

import { ReactComponent as StarIcon } from "icons/menu-star.svg";
import { ReactComponent as HistoryIcon } from "icons/menu-history.svg";
import { ReactComponent as SettingsIcon } from "icons/menu-settings.svg";
import { ReactComponent as TopsIcon } from "icons/menu-tops.svg";

const sideBarItems = [
	{ title: "history", icon: <HistoryIcon /> },
	{ title: "customize_profile", icon: <SettingsIcon /> },
	{ title: "top_best", icon: <TopsIcon /> },
];

const SideBar = () => {
	const { t } = useTranslation();

	return (
		<SideBarWrapper>
			<Box className='user-info'>
				<img
					src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'
					alt='User'
				/>
				<Typography variant='h4'>
					Vasilii Vasiliiev <Box component='span'>#224 {t("in_the_top")}</Box>
				</Typography>
			</Box>
			<Divider />
			<List>
				<ListItem>
					<ListItemButton>
						<Box className='menu-item'>
							<StarIcon />
							<Typography variant='h6'>{t("my_best_score")}</Typography>
						</Box>
					</ListItemButton>
				</ListItem>
			</List>
			<Divider />
			<Box className='menu-list'>
				<List>
					{sideBarItems.map((item) => (
						<ListItem>
							<ListItemButton>
								<Box className='menu-item'>
									{item.icon}
									<Typography variant='h6'>{t(item.title)}</Typography>
								</Box>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Box>
			<Divider />
		</SideBarWrapper>
	);
};

const SideBarWrapper = styled(Box)(() => ({
	padding: "30px 0px",
	maxWidth: 250,
	background: "#3F4649",
	height: "100vh",
	border: "1px solid #4C5558",
	".user-info": {
		textAlign: "center",
		marginBottom: 30,
		padding: "0 16px",
		img: {
			width: 100,
			height: 100,
			borderRadius: 100,
		},
		h4: {
			fontSize: 18,
			fontWeight: 700,
			color: "#fff",
			marginTop: 15,
			span: {
				fontSize: 12,
				fontWeight: 400,
				color: "#989898",
			},
		},
	},
	".menu-item": {
		display: "flex",
		alignItems: "center",
		cursor: "pointer",
		gap: 10,
		h6: {
			fontSize: 16,
			fontWieght: 400,
			color: "#fff",
		},
	},
	".MuiList-root": {
		padding: 0,
		".MuiListItem-root": {
			padding: 0,
		},
	},
}));

export default SideBar;
