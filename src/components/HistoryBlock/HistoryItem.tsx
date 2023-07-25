import { Box, Typography, styled } from "@mui/material";
import InfoItem from "../TestBlock/InfoItem";
import clsx from "clsx";

interface IHistoryItemProps {
	next?: boolean;
}

const HistoryItem = ({ next = false }: IHistoryItemProps) => {
	return (
		<HistoryItemWrapper className={clsx({ next })}>
			<Box className='item-left'>
				<InfoItem type='speed' direction='horizontal' value={200} />
				<InfoItem type='accuracy' direction='horizontal' value={200} />
			</Box>
			<Box>
				<Typography component='span' color='text.dark'>
					30 мая 2023 года в 23:43
				</Typography>
			</Box>
		</HistoryItemWrapper>
	);
};
const HistoryItemWrapper = styled(Box)(() => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "15px 20px",
	borderRadius: "10px",

	"&.next": {
		backgroundColor: "#3F4649",
	},

	".item-left": {
		display: "flex",
		alignItems: "center",
		gap: "48px",
	},
}));
export default HistoryItem;
