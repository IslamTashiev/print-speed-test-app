import DuelBlock from "@/components/DuelBlock/DuelBlock";
import ReadyToDuel from "@/components/DuelBlock/ReadyToDuel";
import PageHead from "@/components/PageHead/PageHead";
import { Box, styled } from "@mui/material";

interface ICompetitivePageProps {
	title: string;
}
const DuelPage = ({ title }: ICompetitivePageProps) => {
	return (
		<CompetitivePageWrapper>
			<PageHead title={title} />
			<DuelBlock />
			<ReadyToDuel />
		</CompetitivePageWrapper>
	);
};

const CompetitivePageWrapper = styled(Box)(() => ({
	width: "80%",
	padding: "0 32px",
	margin: "0 auto",
}));

export default DuelPage;
