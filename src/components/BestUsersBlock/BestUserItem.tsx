import { Box, Typography, styled } from "@mui/material";
import clsx from "clsx";
import InfoItem from "../TestBlock/InfoItem";

interface IHistoryItemProps {
	next?: boolean;
}

const HistoryItem = ({ next = false }: IHistoryItemProps) => {
	return (
		<HistoryItemWrapper className={clsx({ next })}>
			<Box className='user-info'>
				<Typography component='span' className='item-index' color='text.primary'>
					1.
				</Typography>
				<img
					className='user-avatar'
					src='https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
				/>
				<Typography component='span' className='item-index' color='text.primary'>
					Vasilii Vasiliiev
				</Typography>
			</Box>
			<Box className='item-right'>
				<InfoItem type='speed' direction='horizontal' value={100} />
				<InfoItem type='accuracy' direction='horizontal' value={100} />
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

	".item-right": {
		display: "flex",
		alignItems: "center",
		gap: "48px",
	},
	".user-info": {
		display: "flex",
		alignItems: "center",
		gap: "8px",

		span: {
			fontSize: "16px",
			fontWeight: "700",
		},
	},
	".user-avatar": {
		width: "32px",
		height: "32px",
		borderRadius: "32px",
	},
}));
export default HistoryItem;
