import { Box, Typography, styled } from "@mui/material";
import clsx from "clsx";
import InfoItem from "../TestBlock/InfoItem";
import { IHistoryItem } from "@/store/userStore";
import { useTranslation } from "react-i18next";

interface IHistoryItemProps {
	next?: boolean;
	historyItem: IHistoryItem;
}

const HistoryItem = ({ next = false, historyItem }: IHistoryItemProps) => {
	const { t } = useTranslation();

	const date =
		historyItem.day +
		" " +
		t(historyItem.month) +
		", " +
		historyItem.year +
		t("date_prefix") +
		historyItem.time;

	return (
		<HistoryItemWrapper className={clsx({ next })}>
			<Box className='item-left'>
				<InfoItem type='speed' direction='horizontal' value={historyItem.speed} />
				<InfoItem type='accuracy' direction='horizontal' value={historyItem.accuracy} />
			</Box>
			<Box>
				<Typography component='span' color='text.dark'>
					{date}
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
