import PageHead from "@/components/PageHead/PageHead";
import { Box, styled } from "@mui/material";

interface IMainPageProps {
	title: string;
}

const MainPage = ({ title }: IMainPageProps) => {
	return (
		<MainPageWrapper>
			<PageHead title={title} />
		</MainPageWrapper>
	);
};

const MainPageWrapper = styled(Box)(() => ({}));

export default MainPage;
