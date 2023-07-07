import React from "react";
import { Box, Typography } from "@mui/material";
import LanguageSelector from "./LanguageSelector";

interface IPageHeadProps {
	title: string;
}

const PageHead = ({ title }: IPageHeadProps) => {
	return (
		<Box display='flex' justifyContent='space-between' alignItems='center'>
			<Typography variant='h1' color='primary.main' fontSize={36}>
				{title}
			</Typography>
			<LanguageSelector />
		</Box>
	);
};

export default PageHead;
