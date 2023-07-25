import { Box, styled } from "@mui/material";
import BestUsersItem from "./BestUserItem";

const BestUsersBlock = () => {
	return (
		<BestUsersBlockWrapper>
			<BestUsersItem next />
		</BestUsersBlockWrapper>
	);
};

const BestUsersBlockWrapper = styled(Box)(() => ({
	maxHeight: "85vh",
	overflow: "auto",
}));

export default BestUsersBlock;
