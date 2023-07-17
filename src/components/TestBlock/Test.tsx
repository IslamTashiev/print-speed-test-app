import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Skeleton, Typography, styled } from "@mui/material";
import clsx from "clsx";
import { useTestStore } from "@/store/testStore";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Test = () => {
	const [arrOfSimbols, setArrOfSimbols] = useState<string[]>([]);
	const [typedFullText, setTypedFullText] = useState<string>("");
	const [currentSimbol, setCurrentSimbol] = useState<string>("");
	const [isCheckedSimbolFailed, setIsCheckedSimbolFailed] = useState<boolean>(false);
	const [isRunning, setIsRunning] = useState<boolean>(false);

	const { arrOfCheckedSimbols, setArrOfCheckedSimbols } = useTestStore((state) => state);
	const { countOfFailed, setCountOfFailed } = useTestStore((state) => state);
	const { totalTime, setTotalTime } = useTestStore((state) => state);
	const { timerIsStarted, setTimerIsStarted } = useTestStore((state) => state);
	const { testedText, getText, textsIsLoaded } = useTestStore((state) => state);
	const { setAccuracy, setCurrentSpeed } = useTestStore((state) => state);

	const { i18n, t } = useTranslation();
	const myInterval: number | any = useRef(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setTimerIsStarted(true);

		const value = event.target.value;

		if (value[value.length - 1] === currentSimbol) {
			setTypedFullText(value);
			setArrOfSimbols((prevState) => {
				const checkedSimbol: string | undefined = prevState.shift();
				setArrOfCheckedSimbols(checkedSimbol || "");
				setCurrentSimbol(prevState[0]);
				return prevState;
			});
			setIsCheckedSimbolFailed(false);
		} else {
			setIsCheckedSimbolFailed(true);
			setCountOfFailed();
		}
	};
	const toggleTimer = () => {
		setIsRunning((isRunning) => !isRunning);
	};

	const resetCounter = () => {
		clearInterval(myInterval.current);
		myInterval.current = null;
		setIsRunning(false);
	};

	document.addEventListener("click", () => inputRef.current?.focus());

	useEffect(() => {
		if (isRunning) {
			myInterval.current = setInterval(() => {
				setTotalTime();
			}, 1000);
		} else {
			clearInterval(myInterval.current);
			myInterval.current = null;
		}
	}, [isRunning]);
	useEffect(() => {
		if (timerIsStarted) {
			toggleTimer();
		}
	}, [timerIsStarted]);
	useEffect(() => {
		if (arrOfSimbols.length === 0 && arrOfCheckedSimbols.length === testedText.length) {
			resetCounter();
		}
	}, [arrOfSimbols.length === 0, testedText]);
	useEffect(() => {
		if (timerIsStarted) {
			const speed = Math.floor((arrOfCheckedSimbols.length / totalTime) * 60);
			setCurrentSpeed(speed === Infinity ? 0 : speed);
			setAccuracy(+(100 - (countOfFailed / testedText.length) * 100).toFixed(1));
		}
	}, [totalTime, timerIsStarted]);
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [inputRef.current]);
	useEffect(() => {
		if (testedText) {
			setArrOfSimbols(testedText.split(""));
			setCurrentSimbol(testedText.split("")[0]);
		}
	}, [testedText]);
	useEffect(() => {
		getText(i18n.language);
	}, []);

	return (
		<TestWrapper>
			{testedText && textsIsLoaded ? (
				<>
					<Box>
						{arrOfCheckedSimbols.map((char, index) => (
							<Typography
								color='text.primary'
								key={char + index}
								component='span'
								className='simbol verified'
							>
								{char}
							</Typography>
						))}
						{currentSimbol && (
							<Typography
								color='text.primary'
								component='span'
								className={clsx("simbol", "current", { failed: isCheckedSimbolFailed })}
							>
								{currentSimbol}
							</Typography>
						)}

						{arrOfSimbols.map(
							(char, index) =>
								index !== 0 && (
									<Typography
										color='text.primary'
										key={char + index}
										component='span'
										className='simbol'
									>
										{char}
									</Typography>
								)
						)}
					</Box>
					<input
						ref={inputRef}
						type='text'
						value={typedFullText}
						onChange={(e) => onChange(e)}
						className='test-input'
					/>
				</>
			) : !testedText && !textsIsLoaded ? (
				<Box>
					{[90, 92, 96, 99, 100, 90, 99, 100, 85, 90, 92].map((item, index) => (
						<Skeleton key={index} width={item + "%"} />
					))}
				</Box>
			) : (
				<Box className='no-text-wrapper'>
					<Typography color='text.primary' variant='h4'>
						{t("no_text")}
					</Typography>
					<Link to='/texts/new-text/request'>
						<Button variant='outlined'>{t("leave_a_request_text")}</Button>
					</Link>
				</Box>
			)}
		</TestWrapper>
	);
};

const TestWrapper = styled(Box)(() => ({
	padding: 20,
	width: "85%",

	".simbol": {
		variant: "body2",
		fontSize: 21,
		fontWeight: 400,
		lineHeight: "173.023%",
		userSelect: "none",

		"&.verified": {
			fontWeight: 500,
			textShadow:
				"0 0 10px #59A276, 0 0 10px #59A276, 0 0 2px #59A276, 0 0 3px #59A276, 0 0 4px #59A276, 0 0 5px #59A276, 0 0 6px #59A276",
		},

		"&.current": {
			backgroundColor: "#59A276",
			borderRadius: 4,
			padding: "0 2px",
		},
		"&.failed": {
			backgroundColor: "#FF5151",
		},
	},
	".test-input": {
		position: "absolute",
		left: 0,
		top: -10,
		height: 1,
		width: "100%",
		fontSize: 16,
		overflow: "hidden",
		border: "none",
		color: "transparent",
		outline: 0,
	},
	".no-text-wrapper": {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		width: "100%",
		height: "100%",

		h4: {
			fontSize: 20,
			marginBottom: 16,
			maxWidth: "80%",
			textAlign: "center",
		},
	},
}));

export default Test;
