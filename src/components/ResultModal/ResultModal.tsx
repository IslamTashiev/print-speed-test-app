import { Box, CircularProgress, Dialog, Typography, styled } from "@mui/material";
import InfoItem from "../TestBlock/InfoItem";

interface IResultData {
	accuracy: number | undefined;
	speed: number | undefined;
	bestPlace: number | undefined;
}

interface IResultModalProps {
	open: boolean;
	result: IResultData;
	setOpen: (value: boolean) => void;
}

const ResultModal = ({ open, setOpen, result }: IResultModalProps) => {
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<ResultModalWrapper onClose={handleClose} open={open}>
			<Typography variant='h5' className='result-modal-title' color='text.primary'>
				Успех уже близко!
			</Typography>
			<Box className='result-modal-info'>
				<Box className='result-modal-item'>
					<InfoItem type='speed' onModal direction='horizontal' />
					{result?.speed ? (
						<Typography component='span' className='item-value'>
							{result?.speed}
						</Typography>
					) : (
						<CircularProgress style={{ width: 20, height: 20 }} />
					)}
				</Box>
				<Box className='result-modal-item'>
					<InfoItem type='accuracy' onModal direction='horizontal' />

					{result?.accuracy ? (
						<Typography component='span' className='item-value'>
							{result?.accuracy}
						</Typography>
					) : (
						<CircularProgress style={{ width: 20, height: 20 }} />
					)}
				</Box>
				<Box className='result-modal-item'>
					<InfoItem type='bestPlace' onModal direction='horizontal' />
					{result?.bestPlace ? (
						<Typography component='span' className='item-value'>
							{result.bestPlace}
						</Typography>
					) : (
						<CircularProgress style={{ width: 20, height: 20 }} />
					)}
				</Box>
			</Box>
			<Typography variant='body2' className='result-info-text'>
				Постарайся набирать на 9 зн./мин быстрее, чтобы побить свой же рекорд в 209 зн./мин!
			</Typography>
		</ResultModalWrapper>
	);
};

const ResultModalWrapper = styled(Dialog)(() => ({
	".MuiPaper-root": {
		background: "#393E41",
		boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
		borderRadius: "10px",
		border: "1px solid #4C5558",
	},
	".result-modal-title": {
		textAlign: "center",
		fontSize: "24px",
		fontWeight: "700",
		padding: "30px 30px 15px",
	},
	".result-modal-info": {
		padding: "30px",
		background: "#4C5558",
		borderRadius: "10px",
		display: "flex",
		flexDirection: "column",
		gap: "16px",
	},
	".result-modal-item": {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",

		".item-value": {
			fontSize: "24px",
			fontWeight: "700",
		},
	},
	".result-info-text": {
		padding: "20px 30px 30px",
		fontSize: "16px",
		fontWeight: "500",
	},
}));

export default ResultModal;
