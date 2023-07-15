import React from "react";
import { Box, Typography, styled } from "@mui/material";
import LanguageSelector from "./LanguageSelector";

interface IPageHeadProps {
	title: string;
}

const PageHead = ({ title }: IPageHeadProps) => {
	return (
		<PageHeadWrapper>
			<Typography variant='h1' color='primary.main' fontSize={36}>
				{title}
			</Typography>
			<LanguageSelector />
		</PageHeadWrapper>
	);
};

const PageHeadWrapper = styled(Box)(() => ({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	marginY: 24,
}));

export default PageHead;
