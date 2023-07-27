import { Box, styled } from "@mui/material";
import DuelItem from "./DuelItem";
import DuelBlockHeader from "./DuelBlockHeader";

const ReadyToDuel = () => {
	return (
		<ReadyToDuelWrapper>
			<DuelBlockHeader />
			<DuelItem itsMe />
		</ReadyToDuelWrapper>
	);
};

const ReadyToDuelWrapper = styled(Box)(() => ({
	borderRadius: "10px",
	border: "1px solid #4C5558",
	background: "#3F4649",
	boxShadow: "0px 0px 32px -13px rgba(0, 0, 0, 0.25)",
	marginTop: "24px",
}));

export default ReadyToDuel;
