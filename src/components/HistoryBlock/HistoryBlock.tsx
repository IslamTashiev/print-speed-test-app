import { Box, styled } from "@mui/material";
import HistoryItem from "./HistoryItem";

const HistoryBlock = () => {
	return (
		<HistoryBlockWrapper>
			<HistoryItem next />
		</HistoryBlockWrapper>
	);
};

const HistoryBlockWrapper = styled(Box)(() => ({}));

export default HistoryBlock;
