import { Box, styled } from "@mui/material";
import HistoryItem from "./HistoryItem";
import { useUserStore } from "@/store/userStore";

const HistoryBlock = () => {
	const { historyItems } = useUserStore((state) => state);

	return (
		<HistoryBlockWrapper>
			{historyItems.map((historyItem, index) => (
				<HistoryItem next={index % 2 === 0} historyItem={historyItem} />
			))}
		</HistoryBlockWrapper>
	);
};

const HistoryBlockWrapper = styled(Box)(() => ({
	maxHeight: "85vh",
	overflow: "auto",
}));

export default HistoryBlock;
