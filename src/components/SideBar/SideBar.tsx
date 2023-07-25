import {
	Box,
	Button,
	Dialog,
	Divider,
	List,
	ListItem,
	ListItemButton,
	Typography,
	styled,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/store/userStore";
import { useTestStore } from "@/store/testStore";
import { useTitleStore } from "@/store/resultTitleStore";
import { useState } from "react";
import LogoutConfirmModal from "./LogoutConfirmModal";
import ResultModal from "../ResultModal/ResultModal";

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
	const [logoutConfirmModal, setLogoutConfirmModal] = useState<boolean>(false);
	const [isResultMOdalOpen, setIsResultMOdalOpen] = useState<boolean>(false);

	const { userStats, user } = useUserStore((state) => state);
	const { setMyPlace, myPlace } = useTestStore((state) => state);
	const { setTitles } = useTitleStore();
	const { t } = useTranslation();

	const handleShowResultModal = () => {
		setIsResultMOdalOpen(true);
		setMyPlace(userStats?.bestSpeed || 0);
		setTitles("modal_title_12", "");
	};

	return user ? (
		<SideBarWrapper>
			<Box>
				<Box className='user-info'>
					<img src={user.photoURL || ""} alt='User' />
					<Typography variant='h4'>
						{user.displayName} <Box component='span'>#224 {t("in_the_top")}</Box>
					</Typography>
				</Box>
				<Divider />
				<List>
					<ListItem onClick={handleShowResultModal}>
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
							<ListItem key={item.title}>
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
			</Box>
			<Box className='logout-button-wrapper'>
				<Button
					onClick={() => setLogoutConfirmModal(true)}
					variant='text'
					className='logout-button'
				>
					{t("logout")}
				</Button>
				<LogoutConfirmModal setOpen={setLogoutConfirmModal} open={logoutConfirmModal} />
			</Box>

			<ResultModal
				open={isResultMOdalOpen}
				setOpen={setIsResultMOdalOpen}
				result={{
					accuracy: userStats?.bestAccuracy,
					bestPlace: myPlace,
					speed: userStats?.bestSpeed,
				}}
			/>
		</SideBarWrapper>
	) : null;
};

const SideBarWrapper = styled(Box)(() => ({
	padding: "30px 0px",
	maxWidth: "20%",
	width: "100%",
	background: "#3F4649",
	height: "100vh",
	border: "1px solid #4C5558",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",

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
	".logout-button-wrapper": {
		padding: "0 12px",
	},
	".logout-button": {
		width: "100%",
		backgroundColor: "rgba(255, 82, 82, 0.10)",
	},
}));

export default SideBar;
