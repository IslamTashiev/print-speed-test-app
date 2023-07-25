import { Box, styled } from "@mui/material";
import BestUsersBlock from "@/components/BestUsersBlock/BestUsersBlock";
import PageHead from "@/components/PageHead/PageHead";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";

interface IBestUsersProps {
	title: string;
}

const BestUsersPage = ({ title }: IBestUsersProps) => {
	const { getBestUsers } = useUserStore((state) => state);

	useEffect(() => {
		getBestUsers();
	}, []);

	return (
		<BestUsersWrapper>
			<PageHead title={title} />
			<BestUsersBlock />
		</BestUsersWrapper>
	);
};

const BestUsersWrapper = styled(Box)(() => ({
	width: "70%",
	padding: "0 32px",
	margin: "0 auto",
}));

export default BestUsersPage;
