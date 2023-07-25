import { Dialog, Button, styled, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface IConfirmationModalProps {
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	cancel: string;
	confirm: string;
}

const ConfirmationModal = (props: IConfirmationModalProps) => {
	const { open, onClose, onConfirm, title, cancel, confirm } = props;
	const { t } = useTranslation();

	return (
		<ConfirmModalWrapper onClose={onClose} open={open}>
			<Box className='modal-wrapper'>
				<Typography className='modal-title' variant='h5'>
					{t(title)}
				</Typography>
				<Box className='modal-buttons'>
					<Button variant='text' className='cancel-button' onClick={onClose}>
						{t(cancel)}
					</Button>
					<Button onClick={onConfirm} variant='text' className='confirm-button'>
						{t(confirm)}
					</Button>
				</Box>
			</Box>
		</ConfirmModalWrapper>
	);
};

const ConfirmModalWrapper = styled(Dialog)(() => ({
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
	".confirm-button": {
		backgroundColor: "#3F4649",
	},
}));

export default ConfirmationModal;
