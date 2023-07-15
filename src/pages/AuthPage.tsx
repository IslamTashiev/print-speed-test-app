import React from "react";
import { Box, Button, FormControl, Typography, styled } from "@mui/material";

import Input from "@/components/Input/Input";
import { ReactComponent as GoogleIcon } from "icons/google.svg";

const AuthPage = () => {
	return (
		<AuthPageWrapper>
			<Box className='content-wrapper'>
				<Typography className='auth-page-title' variant='h1' color='text.primary'>
					Войдите
				</Typography>
				<FormControl className='page-form'>
					<Input onChange={(e) => e} value={""} placeholder='email@gmail.com' label='Email' />
					<Input onChange={(e) => e} value={""} placeholder='Password' label='Password' />
					<Input onChange={(e) => e} value={""} placeholder='John Johnson' label='Your Name' />
				</FormControl>
				<Button className='button' variant='text'>
					Войти
				</Button>
				<Typography variant='body2' className='help-text' color='text.primary'>
					Или войдите с помощью
				</Typography>
				<Button className='button' variant='text' startIcon={<GoogleIcon />}>
					Google
				</Button>
				<Box>
					<Typography variant='body2' className='help-text' color='text.primary'>
						У вас нет аккаунта? <Typography component='span'>Создайте</Typography>
					</Typography>
				</Box>
			</Box>
		</AuthPageWrapper>
	);
};

const AuthPageWrapper = styled(Box)(() => ({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	width: "100%",
	height: "100vh",

	".content-wrapper": {
		display: "flex",
		flexDirection: "column",
		maxWidth: "350px",
		width: "100%",
		padding: "0 10px",
	},

	".auth-page-title": {
		textAlign: "center",
		fontSize: "34px",
		fontWeight: "700",
	},
	".button": {
		backgroundColor: "#3F4649",
	},
	".page-form": {
		display: "flex",
		flexDirection: "column",
		gap: "16px",
		marginBottom: "20px",
	},
	".help-text": {
		textAlign: "center",
		fontSize: "14px",
		fontWeight: "400",
		marginTop: "20px",
		marginBottom: "20px",

		span: {
			fontSize: "14px",
			fontWeight: "700",
			cursor: "pointer",
		},
	},
}));

export default AuthPage;
