import { Box, styled } from "@mui/material";
import HistoryBlock from "@/components/HistoryBlock/HistoryBlock";
import PageHead from "@/components/PageHead/PageHead";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";

interface IHistoryPageProps {
	title: string;
}

const HistoryPage = ({ title }: IHistoryPageProps) => {
	const { getHistoryItems } = useUserStore((state) => state);

	useEffect(() => {
		getHistoryItems();
	}, []);

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
