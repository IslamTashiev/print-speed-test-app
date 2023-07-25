import { Box, styled } from "@mui/material";
import BestUsersItem from "./BestUserItem";
import { useUserStore } from "@/store/userStore";

const BestUsersBlock = () => {
	const { bestUsers } = useUserStore((state) => state);

	return (
		<BestUsersBlockWrapper>
			{bestUsers.map((bestUserItem, index) => (
				<BestUsersItem
					key={bestUserItem.uid}
					index={index + 1}
					next={index % 2 !== 0}
					bestUserItem={bestUserItem}
				/>
			))}
		</BestUsersBlockWrapper>
	);
};

const BestUsersBlockWrapper = styled(Box)(() => ({
	maxHeight: "85vh",
	overflow: "auto",
}));

export default BestUsersBlock;
