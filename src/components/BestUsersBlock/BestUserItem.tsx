import { Box, Typography, styled } from "@mui/material";
import clsx from "clsx";
import InfoItem from "../TestBlock/InfoItem";
import { IUserInfo, useUserStore } from "@/store/userStore";
import { useTranslation } from "react-i18next";

interface IBestUserItemProps {
	next?: boolean;
	bestUserItem: IUserInfo;
	index?: number;
}

const BestUserItem = ({ next = false, bestUserItem, index }: IBestUserItemProps) => {
	const { user } = useUserStore((state) => state);
	const { t } = useTranslation();
	return (
		<BestUserItemWrapper className={clsx({ next }, "bestuser-" + index)}>
			<Box className='user-info'>
				<Typography component='span' className='item-index' color='text.primary'>
					{index}.
				</Typography>
				<img className='user-avatar' src={bestUserItem.photoURL || ""} />
				<Typography component='span' className='item-index' color='text.primary'>
					{bestUserItem.userName} {user?.uid === bestUserItem.uid ? t("you") : ""}
				</Typography>
			</Box>
			<Box className='item-right'>
				<InfoItem type='speed' direction='horizontal' value={bestUserItem.bestSpeed} />
				<InfoItem type='accuracy' direction='horizontal' value={bestUserItem.bestAccuracy} />
			</Box>
		</BestUserItemWrapper>
	);
};
const BestUserItemWrapper = styled(Box)(() => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "15px 20px",
	borderRadius: "10px",
	marginBottom: "8px",

	".info-item-head-title": {
		color: "#fff",
	},
	".info-item-value": {
		width: "75px",
		justifyContent: "end",
	},
	"&.next": {
		backgroundColor: "#3F4649",
	},
	"&.bestuser-1": {
		backgroundColor: "rgba(254, 216, 67, 0.90)",
	},
	"&.bestuser-2": {
		backgroundColor: "rgba(192, 192, 192, 0.90)",
	},
	"&.bestuser-3": {
		backgroundColor: "rgba(205, 127, 50, 0.90)",
	},

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
}));
export default BestUserItem;
