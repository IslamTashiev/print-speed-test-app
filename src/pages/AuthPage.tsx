import React, { useState } from "react";
import { Box, Button, FormControl, Typography, styled } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";

import Input from "@/components/Input/Input";
import { ReactComponent as GoogleIcon } from "icons/google.svg";
import LanguageSelector from "@/components/PageHead/LanguageSelector";

const AuthPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	const { authType } = useParams();
	const { t } = useTranslation();
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
				<Box className='auth-page-header'>
					<Typography className='auth-page-title' variant='h1' color='text.primary'>
						{isRegisterPage ? t("registration") : t("login")}
					</Typography>
					<LanguageSelector />
				</Box>
				<FormControl className='page-form'>
					<Input
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						placeholder='email@gmail.com'
						label={t("email")}
					/>
					<Input
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						placeholder={t("password")}
						label={t("password")}
					/>
					{isRegisterPage && (
						<Input
							onChange={(e) => setName(e.target.value)}
							value={name}
							placeholder='John Johnson'
							label={t("your_name")}
						/>
					)}
				</FormControl>
				<Button className='button' variant='text'>
					{isRegisterPage ? t("registration") : t("login")}
				</Button>
				<Typography variant='body2' className='help-text' color='text.primary'>
					{t("help_text")}
				</Typography>
				<Button className='button' variant='text' startIcon={<GoogleIcon />}>
					Google
				</Button>
				<Box>
					<Typography variant='body2' className='help-text' color='text.primary'>
						{isRegisterPage ? t("already_have_an_account") : t("dont_have_an_account")}{" "}
						<Typography onClick={changePages} component='span'>
							{isRegisterPage ? t("login") : t("registration")}
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

	".auth-page-header": {
		position: "relative",
		zIndex: 10,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: "24px",

		".language-selector": {
			"@media screen and (max-width: 400px)": {
				".language": {
					display: "none",
				},
				".MuiButtonBase-root": {
					justifyContent: "center",
				},
			},
		},
	},

	".content-wrapper": {
		display: "flex",
		flexDirection: "column",
		maxWidth: "450px",
		width: "100%",
		padding: "0 10px",
	},

	".auth-page-title": {
		// textAlign: "center",
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
