import { Box, styled } from "@mui/material";
import HistoryBlock from "@/components/HistoryBlock/HistoryBlock";
import PageHead from "@/components/PageHead/PageHead";

interface IHistoryPageProps {
	title: string;
}

const HistoryPage = ({ title }: IHistoryPageProps) => {
	return (
		<HistoryPageWrapper>
			<PageHead title={title} />
			<HistoryBlock />
		</HistoryPageWrapper>
	);
};

const HistoryPageWrapper = styled(Box)(() => ({
	width: "70%",
	padding: "0 32px",
	margin: "0 auto",
}));

export default HistoryPage;
