import React from "react";
import { Box, TextField, styled } from "@mui/material";

interface IInputProps {
	label?: string;
	placeholder?: string;
	value: number | string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ onChange, value, label, placeholder }: IInputProps) => {
	return (
		<InputWrapper>
			<Box component='label' color='text.primary' className='input-label'>
				{label}
			</Box>
			<TextField
				value={value}
				onChange={onChange}
				className='input-root'
				placeholder={placeholder}
			/>
		</InputWrapper>
	);
};

const InputWrapper = styled(Box)(() => ({
	".input-root": {
		width: "100%",
		borderRadius: 10,

		".MuiInputBase-input": {
			outline: "none",
			padding: "12px 16px",
			fontSize: "14px",
			fontWeight: "400",
		},
		".MuiInputBase-root": {
			borderRadius: 10,
		},
		".MuiOutlinedInput-notchedOutline": {
			borderColor: "#4C5558",
		},
	},
	".input-label": {
		marginLeft: 8,
		marginBottom: 2,
		fontSize: "14px",
		fontWeight: "400",
	},
}));

export default Input;
