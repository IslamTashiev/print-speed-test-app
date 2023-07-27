import { Box, Button, Grid, Typography, styled } from "@mui/material";
import InfoItem from "../TestBlock/InfoItem";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../PageHead/LanguageSelector";

interface IDuelItem {
	itsMe?: boolean;
}

const DuelItem = ({ itsMe }: IDuelItem) => {
	const { t } = useTranslation();

	return (
		<DuelItemWrapper>
			<Grid container alignItems='center'>
				<Grid xs={2.5} item className='user-info'>
					<Typography component='span' className='item-index' color='text.primary'>
						{1}.
					</Typography>
					<img
						className='user-avatar'
						src={
							"https://lh3.googleusercontent.com/a/AAcHTte8bD4jSblE-H4Z12JD4LJFMXktQunXq--DkOS1xRfC_oI=s96-c"
						}
					/>
					<Typography component='span' className='item-index' color='text.primary'>
						{/* {bestUserItem.userName} {user?.uid === bestUserItem.uid ? t("you") : ""} */}
						Tashiev Islam
					</Typography>
				</Grid>
				<Grid xs={1.5} item>
					{itsMe ? (
						<LanguageSelector changeGlobal={true} />
					) : (
						<Typography component='p' color='text.dark'>
							Русский
						</Typography>
					)}
				</Grid>
				<Grid xs={3} item>
					<InfoItem type='speed' direction='horizontal' value={200} />
				</Grid>
				<Grid xs={3} item>
					<InfoItem type='accuracy' direction='horizontal' value={200} />
				</Grid>
				<Grid xs={2} item display='flex' justifyContent='end'>
					<Button variant='text' className='button'>
						{itsMe ? t("dueling") : t("start_duel")}
					</Button>
				</Grid>
			</Grid>
		</DuelItemWrapper>
	);
};

const DuelItemWrapper = styled(Box)(() => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "15px 20px",
	borderRadius: "10px",
	background: "#393E41",
	marginTop: "8px",
	".item-right": {
		display: "flex",
		alignItems: "center",
		gap: "48px",
	},
	".item-index": {
		"&.best": {
			color: "#FED843",
		},
	},

	".user-info": {
		display: "flex",
		alignItems: "center",
		gap: "8px",

		span: {
			fontSize: "16px",
			fontWeight: "700",
		},
	},
	".user-avatar": {
		width: "32px",
		height: "32px",
		borderRadius: "32px",
	},
	".button": {
		backgroundColor: "#3F4649",
	},
}));

export default DuelItem;
