import React, { useState } from "react";
import { Box, Button, FormControl, Typography, styled } from "@mui/material";
import { useNavigate, useParams } from "react-router";

import Input from "@/components/Input/Input";
import { ReactComponent as GoogleIcon } from "icons/google.svg";

const AuthPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	const { authType } = useParams();
	const navigate = useNavigate();

	const isRegisterPage = authType === "register";

	const changePages = () => {
		if (isRegisterPage) {
			navigate("/authorization/login");
		} else {
			navigate("/authorization/register");
		}
	};

	return (
		<AuthPageWrapper>
			<Box className='content-wrapper'>
				<Typography className='auth-page-title' variant='h1' color='text.primary'>
					{isRegisterPage ? "Регистрация" : "Войдите"}
				</Typography>
				<FormControl className='page-form'>
					<Input
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						placeholder='email@gmail.com'
						label='Email'
					/>
					<Input
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						placeholder='Password'
						label='Password'
					/>
					{isRegisterPage && (
						<Input
							onChange={(e) => setName(e.target.value)}
							value={name}
							placeholder='John Johnson'
							label='Your Name'
						/>
					)}
				</FormControl>
				<Button className='button' variant='text'>
					{isRegisterPage ? "Регистрация" : "Войти"}
				</Button>
				<Typography variant='body2' className='help-text' color='text.primary'>
					Или войдите с помощью
				</Typography>
				<Button className='button' variant='text' startIcon={<GoogleIcon />}>
					Google
				</Button>
				<Box>
					<Typography variant='body2' className='help-text' color='text.primary'>
						{isRegisterPage ? "Уже есть аккаунт? " : "У вас нет аккаунта? "}
						<Typography onClick={changePages} component='span'>
							{isRegisterPage ? "Войти" : "Создайте"}
						</Typography>
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
