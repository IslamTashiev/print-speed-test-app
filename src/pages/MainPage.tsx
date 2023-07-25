import PageHead from "@/components/PageHead/PageHead";
import TestBlock from "@/components/TestBlock/TestBlock";
import { Box, styled } from "@mui/material";

interface IMainPageProps {
	title: string;
}

const MainPage = ({ title }: IMainPageProps) => {
	return (
		<MainPageWrapper>
			<PageHead title={title} />
			<TestBlock />
		</MainPageWrapper>
	);
};

const MainPageWrapper = styled(Box)(() => ({
	width: "70%",
	padding: "0 32px",
	margin: "0 auto",
}));

export default MainPage;
