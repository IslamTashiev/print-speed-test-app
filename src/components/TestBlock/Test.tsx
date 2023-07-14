import React from "react";
import { Box, Typography, styled } from "@mui/material";

const Test = () => {
	return (
		<TestWrapper>
			<Typography
				color='text.primary'
				variant='body2'
				fontSize={18}
				fontWeight={400}
				lineHeight={"173.023%"}
			>
				При изучении программирования необходимо выбрать язык программирования, который наилучшим
				образом подходит для достижения ваших целей. Начните с основных концепций, таких как
				переменные, условия и циклы. Изучите структуры данных, такие как массивы и списки. После
				этого углубляйтесь в изучение выбранного языка. Помните, что каждый язык программирования
				имеет свои преимущества и недостатки. Не паникуйте, а постепенно двигайтесь вперед, углубляя
				свои знания и навыки.
			</Typography>
		</TestWrapper>
	);
};

const TestWrapper = styled(Box)(() => ({
	padding: 20,
}));

export default Test;
