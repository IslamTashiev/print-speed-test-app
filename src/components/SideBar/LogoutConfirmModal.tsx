import { useUserStore } from "@/store/userStore";
import { Box, Button, Dialog, Typography, styled } from "@mui/material";
import { useTranslation } from "react-i18next";

interface ILogoutConfirmModalProps {
	open: boolean;
	setOpen: (value: boolean) => void;
}

const LogoutConfirmModal = ({ open, setOpen }: ILogoutConfirmModalProps) => {
	const { logout } = useUserStore((state) => state);
	const { t } = useTranslation();

	const handleLogout = () => {
		handleClose();
		logout();
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<LogoutConfirmModalWrapper onClose={handleClose} open={open}>
			<Box className='modal-wrapper'>
				<Typography className='modal-title' variant='h5'>
					{t("logout_text")}
				</Typography>
				<Box className='modal-buttons'>
					<Button variant='text' className='cancel-button' onClick={handleClose}>
						{t("cancel")}
					</Button>
					<Button onClick={handleLogout} variant='text' className='logout-button'>
						{t("logout")}
					</Button>
				</Box>
			</Box>
		</LogoutConfirmModalWrapper>
	);
};

const LogoutConfirmModalWrapper = styled(Dialog)(() => ({
	".MuiPaper-root": {
		background: "#393E41",
	},
	".modal-wrapper": {
		padding: 16,
	},
	".modal-title": {
		maxWidth: "400px",
		textAlign: "center",
		marginBottom: "16px",
	},
	".modal-buttons": {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		gap: "8px",

		".MuiButtonBase-root": {
			padding: "6px 28px",
		},
	},
	".cancel-button": {
		backgroundColor: "#3F4649",
	},
	".logout-button": {
		backgroundColor: "rgba(255, 82, 82, 0.10)",
	},
}));

export default LogoutConfirmModal;
