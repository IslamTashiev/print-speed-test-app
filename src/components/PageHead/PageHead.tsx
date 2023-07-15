import React from "react";
import { Box, Typography, Button, styled } from "@mui/material";
import LanguageSelector from "./LanguageSelector";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/store/userStore";

interface IPageHeadProps {
	title: string;
}

const PageHead = ({ title }: IPageHeadProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { user } = useUserStore((state) => state);

	return (
		<PageHeadWrapper>
			<Typography variant='h1' color='primary.main' fontSize={36}>
				{title}
			</Typography>
			<Box className='header-right'>
				{!user && (
					<>
						<Button onClick={() => navigate("/authorization/login")} variant='text'>
							{t("login")}
						</Button>
						<Button onClick={() => navigate("/authorization/register")} variant='text'>
							{t("registration")}
						</Button>
					</>
				)}
				<LanguageSelector />
			</Box>
		</PageHeadWrapper>
	);
};

const PageHeadWrapper = styled(Box)(() => ({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	marginTop: 24,
	marginBottom: 24,

	".header-right": {
		display: "flex",
		gap: "4px",
	},
}));

export default PageHead;
