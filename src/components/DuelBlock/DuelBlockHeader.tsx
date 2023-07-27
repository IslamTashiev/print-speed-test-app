import { Grid, Typography, styled } from "@mui/material";
import { useTranslation } from "react-i18next";

const DuelBlockHeader = () => {
	const { t } = useTranslation();

	return (
		<DuelBlockHeaderWrapper container alignItems='center'>
			<Grid xs={2.5} item className='user-info'>
				<Typography component='span' className='item-text' color='text.primary'>
					{t("name")}
				</Typography>
			</Grid>
			<Grid xs={1.5} item>
				<Typography component='span' className='item-text' color='text.primary'>
					{t("language")}
				</Typography>
			</Grid>
			<Grid xs={3} item>
				<Typography component='span' className='item-text' color='text.primary'>
					{t("best_speed")}
				</Typography>
			</Grid>
			<Grid xs={3} item>
				<Typography component='span' className='item-text' color='text.primary'>
					{t("best_accuracy")}
				</Typography>
			</Grid>
		</DuelBlockHeaderWrapper>
	);
};

const DuelBlockHeaderWrapper = styled(Grid)(() => ({
	paddingTop: 12,
	paddingBottom: 12,
	paddingLeft: "12px",
	borderBottom: "1px solid #4C5558",

	".item-text": {
		fontSize: 14,
		fontWeight: 500,
	},
}));

export default DuelBlockHeader;
